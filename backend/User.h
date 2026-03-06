/** User Class
 * 
 * 
 * 
 * 
 */

#ifndef USER_H
#define USER_H

#include <string>
#include <vector>
#include "History.h"
#include "Watchlist.h"
#include "Item.h"



class User {
private:
    // User attributes
    std::string username;
    std::string password;

    // User's history and watchlist
    std::vector<history> history; 
    std::vector<watchlist> watchlist;

    // Items sold and bid on by the user
    std::vector<Item> sold;
    std::vector<Item> bids;
    
public:
    User(std::string username, std::string password, std::string email);
    ~User();

    // Getters and Setters
    std::string getUsername() const;
    void setUsername(const std::string& username);

    std::string getPassword() const;
    void setPassword(const std::string& password);

    std::string getEmail() const;
    void setEmail(const std::string& email);

    // History and Watchlist management
    void addToHistory(const history& entry);
    void addToWatchlist(const watchlist& entry);

    // Item management
    void addSoldItem(const Item& item);
    void addBidItem(const Item& item);
};

#endif