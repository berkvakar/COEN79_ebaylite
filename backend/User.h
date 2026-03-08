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
#include "Item.h"



class User {
private:
    // User attributes
    std::string username;
    std::string password;
    std::string email;

    // User's history and watchlist
    std::vector<Item> history; 
    std::vector<Item> watchlist;

    // Items sold and bid on by the user
    std::vector<Item> sold;
    std::vector<std::pair<double, Item>> bids;
    
public:
    User() = default;
    User(std::string username, std::string password);

    // Getters and Setters
    std::string getUsername() const;
    void setUsername(const std::string& username);

    std::string getPassword() const;
    void setPassword(const std::string& password);

    
    // History and Watchlist management
    void addToHistory(const Item& entry);
    void addToWatchlist(const Item& entry);

    std::vector<Item> getHistory() const;
    std::vector<Item> getWatchlist() const;

    // Item management
    void addSoldItem(const Item& item);
    void addBidItem(const double& bidAmount, const Item& item);

    std::vector<Item> getSoldItems() const;
    std::vector<std::pair<double, Item>> getBidItems() const;
};

#endif // USER_H
