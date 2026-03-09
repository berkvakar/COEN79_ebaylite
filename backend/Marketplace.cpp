/* Marketplace.cpp
 *implementation of the market class 
 *market stores all active item listings
 */


#include "Marketplace.h"
#include "Logs.h"

Marketplace::Marketplace() {} //constructor (just init obj)

void Marketplace::addItem(const Item& item)		//adds new item listing to marketplace
{
	listings.push_back(item);			
}

//return copy list of items in market
std::list<Item> Marketplace::getListings(int sortOption) const
{	
	return listings;				//return no sort
}
//return reference to the actual listings list
std::list<Item>& Marketplace::getListingsRef()
{
    return listings;
}
void Marketplace::refresh(Userbase& userbase, Logs& logs) {
	//check if any items are expired or sold to remove them from marketplace close auction should handle all of the user logic
	for (auto it = listings.begin(); it != listings.end(); ) {
		if (it->isExpired()) {
			logs.addLog("Item expired: " + it->getName());
			it->closeAuction(userbase);
			it = listings.erase(it);
			continue;
		}
		if (it->isSold()) {
			logs.addLog("Item deleted: " + it->getName());
			it = listings.erase(it);
			continue;
		}
		++it;
	}

}

