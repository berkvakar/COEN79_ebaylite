/**Marketplace.h
 * 
 * stores all of the listings (unsold items) in the marketplace
 * 
 * 
 * 
 */

#ifndef MARKETPLACE_H
#define MARKETPLACE_H
#include <list>
#include "Item.h"
class Marketplace{
    private:
        std::list<Item> listings; // Vector to store all the items listed in the marketplace
    public:
        enum sortOptions {
            NEWEST_FIRST = 0,
            OLDEST_FIRST = 1,
            LOWEST_PRICE_FIRST = 2,
            HIGHEST_PRICE_FIRST = 3
        };
        Marketplace();
        void addItem(const Item& item); // Method to add an item to the marketplace
        std::list<Item> getListings(int sortOption = 0) const; // Method to retrieve all listings in the marketplace
        void refresh();
};

#endif // MARKETPLACE_H
