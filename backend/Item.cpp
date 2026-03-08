#include "Item.h"

Item::Item(std::string name,
           std::string description,
           double buynow_price,
           User seller,
           std::time_t endTime)
    : name(name),
      description(description),
      buynow_price(buynow_price),
      seller(seller),
      endTime(endTime),
      sold(false)
{
}

Item::~Item() {}

std::string Item::getName() const {
    return name;
}

void Item::setName(const std::string& name) {
    this->name = name;
}

std::string Item::getDescription() const {
    return description;
}

void Item::setDescription(const std::string& description) {
    this->description = description;
}

double Item::getBuynowPrice() const {
    return buynow_price;
}

void Item::setBuynowPrice(double price) {
    buynow_price = price;
}

Bids Item::getBidsList() const {
    return bidsList;
}

void Item::addBid(double bid, const std::string& bidderUsername) {
    bidsList.addBid(bid, bidderUsername);
}

bool Item::isSold() const {
    return sold;
}

void Item::markAsSold() {
    sold = true;
}

User Item::getSeller() const {
    return seller;
}

bool Item::isExpired() const {
    return std::time(nullptr) > endTime;
}

void Item::closeAuction() {
    sold = true;
}
