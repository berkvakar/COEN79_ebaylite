/**User Class implementation file
 * 
 * 
 */

#include "User.h"

User::User(std::string username, std::string password){
    username = username;
    password = password;
    history = std::vector<Item>();
    watchlist = std::vector<Item>();
    sold = std::vector<Item>();
    bids = std::vector<std::pair<double, Item>>();
} 

//Getters and Setters for username and password
std::string User::getUsername() const {
    return username;
}

void User::setUsername(const std::string& username) {
    this->username = username;
}

std::string User::getPassword() const {
    return password;
}

void User::setPassword(const std::string& password) {
    this->password = password;
}

//History and Watchlist management
void User::addToHistory(const Item& entry) {
    history.push_back(entry);
}

void User::addToWatchlist(const Item& entry) {
    watchlist.push_back(entry);
}

std::vector<Item> User::getHistory() const {
    return history;
}

std::vector<Item> User::getWatchlist() const {
    return watchlist;
}

//bids and sold management
void User::addSoldItem(const Item& item) {
    sold.push_back(item);
}

void User::addBidItem(const double& bidAmount, const Item& item) {
    bids.push_back(std::make_pair(bidAmount, item));
}

std::vector<std::pair<double, Item>> User::getBidItems() const {
    return bids;
}

std::vector<Item> User::getSoldItems() const {
    return sold;
}

