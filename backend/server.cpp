// server.cpp

#include "crow_all.h"
#include "Marketplace.h"
#include "Userbase.h"
#include "Item.h"
#include <string>
#include <vector>
#include <ctime>
#include <cstdlib>

int main() {

    crow::App<crow::CORSHandler> app;
    auto& cors = app.get_middleware<crow::CORSHandler>();
    cors.global().origin("*").methods("GET"_method, "POST"_method, "OPTIONS"_method).headers("Content-Type");
    
    Marketplace market;
    Userbase userbase;

    // create some dummy users
    for(int i = 0; i < 5; i++) {

        std::string username = "user" + std::to_string(i);
        std::string password = "password" + std::to_string(i);

        User user(username, password);
        userbase.addUser(user);
    }

	//AUTH API ENDPOINTS
	
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

	CROW_ROUTE(app, "/signup").methods("POST"_method)
	([&userbase](const crow::request& req) {
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
		return crow::response(200, "User created successfully");
	});

    // create some dummy items
    for(int i = 0; i < 10; i++) {

        std::string name = "Item " + std::to_string(i);
        std::string description = "Random Description";
        double price = 50 + (rand() % 100);

        User dummyuser(
            "seller" + std::to_string(i),
            "password"
        );

        Item item(name, description, price, dummyuser, std::time(nullptr));

        market.addItem(item);
    }

    // API: return all listings
    CROW_ROUTE(app, "/listingsAPI")
    ([&market]() {

        crow::json::wvalue results;

        std::vector<Item> items = market.getListings();

        for(int i = 0; i < items.size(); i++) {

            results[i]["name"] = items[i].getName();
            results[i]["description"] = items[i].getDescription();
            results[i]["price"] = items[i].getBuynowPrice();
        }

        return results;
    });

    // API: add item
    CROW_ROUTE(app, "/addItem").methods("POST"_method)
    ([&market](const crow::request& req) {

        auto body = crow::json::load(req.body);

        std::string name = body["name"].s();
        std::string description = body["description"].s();
        double price = body["price"].d();

        User seller("seller", "password");

        Item newItem(name, description, price, seller, std::time(nullptr));

        market.addItem(newItem);

        return crow::response(200, "Item added");
    });

    app.port(18080).multithreaded().run();

    return 0;
}
