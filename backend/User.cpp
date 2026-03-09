#include "User.h"
#include "Item.h"


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

void User::addToHistory(Item* entry) {
    history.push_back(entry);
}

void User::addToWatchlist(Item* entry) {
    watchlist.push_back(entry);
}

void User::addSoldItem(Item* item) {
    sold.push_back(item);
}

void User::addBidItem(Item* item) {
    bids.push_back(item);
}

const std::vector<Item*>& User::getHistory() const {
    //bid amount, Item name, did you buy it
    //vector<arr[3]>?
    return history;
}

const std::vector<Item*>& User::getWatchlist() const {
    //item->id, name
    return watchlist;
}

const std::vector<Item*>& User::getSold() const {
    //id , price
    return sold;
}

const std::vector<Item*>& User::getBids() const {
    return bids;
}
