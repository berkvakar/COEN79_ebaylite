/** File that will run the server and handle incoming requests from frontend
 *  This is where the actual applications will run and where the marketplace and userbase objects will be created and manipulated. 
 */

 //includes
#include <asio.hpp> 
namespace asio { typedef io_context io_service; }
#include "crow_all.h"
#include "Userbase.h"
#include "Marketplace.h"
#include "Item.h"

#include <string>
#include <vector>
#include <iostream>
/** Returns true if user was created, false if username already exists. */
bool createUser(Userbase& userbase, const std::string& username, const std::string& password) {
    if (userbase.userExists(username))
        return false;
    userbase.addUser(User(username, password));
    return true;
}

 int main(){
        crow::SimpleApp app;

        Marketplace market; //create marketplace object
        Userbase userbase; //create userbase object

       //Generate 10 users
       for (int i = 0; i < 10; i++) {
              User dummyuser = User("user" + std::to_string(i), "password" + std::to_string(i));
              userbase.addUser(dummyuser);
       }

       //create user route that will create a new user
       // returns true if user was created, false if username already exists
       //use case: when user signs up, frontend will send a POST request to this route to create a new user
        CROW_ROUTE(app, "/createuser")
        .methods("POST"_method)
        ([&userbase](const crow::request& req) {
            auto body = crow::json::load(req.body);
            std::string username = std::string(body["username"].s());
            std::string password = std::string(body["password"].s());
            bool ok = createUser(userbase, username, password);
            return crow::response(crow::json::wvalue(ok));
        });

	CROW_ROUTE(app, "/items")
	([&market]()
	{
		crow::jason::wvalue results;
		std::vector<Item> items = market.getItems();
		for(int i = 0; i< items.size(); i++)
		{	
			result[i]["name"] = items[i].getName();
			result[i]["description"] = items[i].getDescription();
			result[i]["price"] = items[i].getBuyNowPrice();
		}
		return results;
	});
	CROW_ROUTE(app, "/additem")
	.methods("POST"_method)
	([&market](const crow::request& req) {
		auto body = crow::json::load(req.body);

		std::string name = body["name"].s();
		std::string description = body["description"].s();
		double price = body["price"].d();

		market.addItem(name, description, price);

		return crow::response("Item added");
	});
	CROW_ROUTE(app, "/bid")
	.methods("POST"_method)
	([&market](const crow::request& req) {
		auto body = crow::json::load(req.body);

		std::string itemName = body["item"].s();
		std::string username = body["user"].s();
		double amount = body["amount"].d();

		bool success = market.placeBid(itemName, username, amount);
		return crow::response(crow::json::wvalue(success));
	});
	std::cout<<"Servver Running On Port 18080\n";
        app.port(18080).multithreaded().run();
 }
