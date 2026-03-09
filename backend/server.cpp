// server.cpp

#include "crow_all.h"
#include "Marketplace.h"
#include "Userbase.h"
#include "Item.h"
#include "Logs.h"
#include <string>
#include <vector>
#include <list>
#include <ctime>
#include <cstdlib>
#include <thread>
#include <chrono>

void simulateBids(Marketplace& marketplace)
{
	for (auto& item : marketplace.getListingsRef()){
        	if (rand() % 4 == 0)  // 25% chance
        	{
           		double newBid = item.getHighestBid().first + (rand() % 20 + 1);
            		item.addBid(newBid, "botUser");
        	}
    	}
}
int main() {

    crow::App<crow::CORSHandler> app;
    auto& cors = app.get_middleware<crow::CORSHandler>();
    cors.global().origin("*").methods("GET"_method, "POST"_method, "DELETE"_method, "OPTIONS"_method).headers("Content-Type");
    
    Marketplace market;
    Userbase userbase;
    Logs logs;

    // create some dummy users
    for(int i = 0; i < 5; i++) {

        std::string username = "user" + std::to_string(i);
        std::string password = "password" + std::to_string(i);

        User user(username, password);
        userbase.addUser(user);
    }

	//--------------------------------AUTH API ENDPOINTS--------------------------------
	
	//LOGIN API ENDPOINT, takes username and password, returns 200 if successful, 401 if failed
	CROW_ROUTE(app, "/login").methods("POST"_method)
	([&userbase](const crow::request& req) {
		auto body = crow::json::load(req.body);
		std::string username = body["username"].s();
		std::string password = body["password"].s();
		//check if user exists
		if(!userbase.userExists(username)) {
			return crow::response(401, "Username is wrong");
		}
		//check if password is correct
		User* user = userbase.getUser(username);
		if(user->getPassword() == password) {
			return crow::response(200, "Login successful");
		}
		return crow::response(401, "Password is wrong");
	});

	//checks if user exists, creates new user if not, returns 200 if successful, 400 if user already exists
	CROW_ROUTE(app, "/signup").methods("POST"_method)
	([&userbase, &logs](const crow::request& req) {
		auto body = crow::json::load(req.body);
		std::string username = body["username"].s();
		std::string password = body["password"].s();
		//check if user already exists
		if(userbase.userExists(username)) {
			return crow::response(400, "User already exists");
		}
		//create new user
		User newUser(username, password);
		userbase.addUser(newUser);
		logs.addLog("Account created: " + username);
		return crow::response(200, "User created successfully");
	});
	
	//deletes user, returns 200 if successful, 400 if user does not exist
	CROW_ROUTE(app, "/deleteUser").methods("DELETE"_method)
	([&userbase, &logs](const crow::request& req) {
		auto body = crow::json::load(req.body);
		std::string username = body["username"].s();
        //check if user exists
		if(!userbase.userExists(username)) {
			return crow::response(400, "User does not exist");
		}
		userbase.removeUser(username);
		logs.addLog("Account deleted: " + username);
		return crow::response(200, "User deleted successfully");
	});


    // CROW_ROUTE(app, "/getUsers").methods("GET"_method)
	// ([&userbase](const crow::request& req) {
		
        
		
	// 	return crow::response(200, "User deleted successfully");
	// });
    //--------------------------------USER PROFILE DATA-------------------------------------
    CROW_ROUTE(app, "/profile/<string>").methods("GET"_method)
    ([&userbase, &market](const std::string& username) {
        if (!userbase.userExists(username)) {
            return crow::response(404, "User does not exist");
        }

        crow::json::wvalue profile;
        profile["username"] = username;

        User* user = userbase.getUser(username);
        if(user == nullptr) {
            return crow::response(404, "User does not exist");
        }

	auto toJsonList = [](const std::vector<Item*>& items) 
	{
 	   	crow::json::wvalue::list out;
   		for (const auto* item : items)
    		{
       			crow::json::wvalue entry;
			if(item != nullptr)
        		{
            			entry["name"] = item->getName();
            			entry["description"] = item->getDescription();
           	 		entry["price"] = item->getBuynowPrice();

           			 // include the highest bid amount
         			   entry["amount"] = item->getHighestBid().first;
        		}
			out.push_back(entry);
   	 	}	
	    return out;
	};

        profile["history"] = toJsonList(user->getHistory());
        profile["watchlist"] = toJsonList(user->getWatchlist());
        profile["sold"] = toJsonList(user->getSold());
        profile["bids"] = toJsonList(user->getBids());

        return crow::response{profile};
    });
    //--------------------------------LISTINGS API ENDPOINTS--------------------------------

    // create some dummy items
    for(int i = 0; i < 10; i++) {

        std::string name = "Item " + std::to_string(i);
        std::string description = "Random Description";
        double price = 50 + (rand() % 100);

        User dummyuser(
            "seller" + std::to_string(i),
            "password"
        );

        Item item(name, description, price, dummyuser, std::time(nullptr) + 2 * 60 * 60);

        market.addItem(item);
    }
     User dummyuser(
            "seller" + std::to_string(19),
            "password"
        );
    Item test("abcs", "a", 100, dummyuser,std::time(nullptr) + 2 * 60);
    market.addItem(test);

    // API: return all listings
    CROW_ROUTE(app, "/listingsAPI")
    ([&market, &userbase, &logs]() {
        market.refresh(userbase, logs);
        crow::json::wvalue results;

        std::list<Item> items = market.getListings();
        int i = 0;
        for (const auto& item : items) {
            results[i]["name"] = item.getName();
            results[i]["description"] = item.getDescription();
            results[i]["price"] = item.getBuynowPrice();
            results[i]["highestBid"] = item.getHighestBid().first;
            results[i]["bidder"] = item.getHighestBid().second;
            results[i]["timeLeftSeconds"] = item.getTimeLeftSeconds();
            ++i;
        }

        return results;
    });

    // API: add item
    CROW_ROUTE(app, "/addItem").methods("POST"_method)
    ([&market, &logs, &userbase](const crow::request& req) {

        auto body = crow::json::load(req.body);

        std::string name = body["name"].s();
        std::string description = body["description"].s();
        double price = body["price"].d();
        std::string sellerName = body["seller"].s();

       std::time_t now = std::time(nullptr);
       std::time_t endTime = now + 2 * 60 * 60;

       if (body.has("endTimeInSeconds")) {
            std::time_t requestedEndTime = static_cast<std::time_t>(body["endTimeInSeconds"].i());
            if (requestedEndTime > now) {
                endTime = requestedEndTime;
            }
        }

        User* seller = userbase.getUser(sellerName);

        if(seller == nullptr)
        {
            return crow::response(400, "Seller does not exist");
        }

        Item newItem(name, description, price, *seller, endTime);

        market.addItem(newItem);

        // add to seller profile
        std::list<Item>& items = market.getListingsRef();
        seller->addSoldItem(&items.back());

        logs.addLog("Item created: " + name);

        return crow::response(200, "Item added");
    });
    // API: place bid

    CROW_ROUTE(app, "/bid").methods("POST"_method)
    ([&market, &logs, &userbase](const crow::request& req)
    {
        auto body = crow::json::load(req.body);

        if(!body)
        {
            return crow::response(400, "Invalid JSON");
        }

        int id = body["id"].i();
        double bid = body["bid"].d();
        std::string bidder = body["bidder"].s();
	std::cout << "Bidder received: " << bidder << std::endl;

        std::list<Item>& items = market.getListingsRef();

        int i = 0;
        for(auto& item : items)
        {
            if(i == id)
            {
                if(bid <= item.getHighestBid().first)
                {
                    return crow::response(400, "Bid too low");
                }
                item.addBid(bid, bidder);
                // add to user's bids list

	User* user = userbase.getUser(bidder);
		if(user != nullptr)
		{
			user->addBidItem(&item);
			std::cout << "Added bid to user. Total bids now: "
            	  	<< user->getBids().size() << std::endl;
		}
		else
		{
    			std::cout << "User not found for bidder: " << bidder << std::endl;
		}

                logs.addLog("Bid placed on " + item.getName());
                return crow::response(200, "Bid accepted");
            }

            i++;
        }
        return crow::response(404, "Item not found");
    });


    CROW_ROUTE(app, "/watch").methods("POST"_method)
    ([&userbase, &market](const crow::request& req)
    {
        auto body = crow::json::load(req.body);

        if(!body)
            return crow::response(400, "Invalid JSON");

        int id = body["id"].i();
        std::string username = body["username"].s();

        User* user = userbase.getUser(username);
        if(user == nullptr)
           return crow::response(404, "User not found");

        std::list<Item>& items = market.getListingsRef();

        int i = 0;
        for(auto& item : items)
        {
            if(i == id)
            {
                user->addToWatchlist(&item);
                return crow::response(200, "Added to watchlist");
            }
            i++;
        }

        return crow::response(404, "Item not found");
    });

    CROW_ROUTE(app, "/logs").methods("GET"_method)
    ([&logs]() {
        logs.printLogs();
        return crow::response(200, "Logs printed");
    });
    // start background bot bidding
    std::thread([&market]() {
        while(true)
        {
            simulateBids(market);
            std::this_thread::sleep_for(std::chrono::seconds(10)); // bot bids every 10s
        }
    }).detach();
    app.port(18080).multithreaded().run();

    return 0;
}
