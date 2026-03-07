/** Item Class
 * 
 * 
 */
#ifndef ITEM_H
#define ITEM_H

#include <string>
#include <ctime>
#include "Bids.h"
#include "User.h"

class Item {
    private:

        std::string name;
        std::string description;
        double buynow_price;
        Bids bidsList;
        bool sold;
        User seller;
        std::time_t endTime; 

    public:
        Item(std::string name, std::string description, double buynow_price, User seller, std::time_t endTime = std::time(nullptr) + 7 * 24 * 60 * 60); // Default end time is 7 days from now
        ~Item();

        // Getters and Setters
        std::string getName() const;
        void setName(const std::string& name);

        std::string getDescription() const;
        void setDescription(const std::string& description);

        double getBuynowPrice() const;
        void setBuynowPrice(double price);

        Bids getBidsList() const; // Method to retrieve bids sorted by the specified option
        void addBid(double bid);

        bool isSold() const;
        void markAsSold();

        User getSeller() const;
        //SIMULATION FUNCTIONS
        bool isExpired() const;
        void closeAuction();
};

#endif // ITEM_H

