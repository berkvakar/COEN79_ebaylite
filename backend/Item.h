#ifndef ITEM_H
#define ITEM_H

#include <string>
#include <ctime>
#include <utility>
#include "Bids.h"
#include "User.h"

class Item {

private:
    int id;
    std::string name;
    std::string description;
    double buynow_price;
    Bids bidsList;
    bool sold;
    User seller;
    std::time_t endTime;

public:

    Item(std::string name,
         std::string description,
         double buynow_price,
         User seller,
         std::time_t endTime = std::time(nullptr) + 7*24*60*60);

    ~Item();

    std::string getName() const;
    void setName(const std::string& name);

    std::string getDescription() const;
    void setDescription(const std::string& description);

    double getBuynowPrice() const;
    void setBuynowPrice(double price);

    Bids getBidsList() const;
    std::pair<double, std::string> getHighestBid() const;
    void addBid(double bid, const std::string& bidderUsername);

    bool isSold() const;
    void markAsSold();

    User getSeller() const;

    int getTimeLeftSeconds() const;
    bool isExpired() const;
    void closeAuction();
};

#endif
