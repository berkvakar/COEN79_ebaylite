/** Item class implementation
 * 
 * 
 */

#include "Item.h"
#include "User.h"

Item::Item(std::string name, User* seller, double buynow_price, std::time_t endTime = std::time(nullptr) + 7 * 24 * 60 * 60, std::string description = ""){
    this->name = name;
    this->description = description;
    this->buynow_price = buynow_price;
    this->seller = seller;
    this->endTime = endTime;
    Bids bidsList; // Initialize an empty Bids object
    this->sold = false;
}

//simple getters
std::string Item::getName() const {
    return name;
}
    
std::string Item::getDescription() const {
    return description;
}

double Item::getBuynowPrice() const {
    return buynow_price;
}

Bids Item::getBidsList() const {
    return bidsList;
}

User* Item::getSeller() const {
    return seller;
}

bool Item::isSold() const {
    return sold;
}

//Setters
void Item::setName(const std::string& name) {
    this->name = name;
}

void Item::setDescription(const std::string& description) {
    this->description = description;
}

void Item::setBuynowPrice(double price) {
    this->buynow_price = price;
}

void Item::addBid(double bid, const std::string& bidderUsername) {
    bidsList.addBid(bid, bidderUsername);
}

void Item::markAsSold() {
    sold = true;
}

//SIMULATION FUNCTIONS
bool Item::isExpired() const {
    return std::time(nullptr) >= endTime;
}

void Item::closeAuction() {
    if (isExpired() && !sold) {
        sold = true; // Mark the item as sold when the auction ends
    }
}

