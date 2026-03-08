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
