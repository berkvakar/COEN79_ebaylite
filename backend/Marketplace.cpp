/* Marketplace.cpp
 *implementation of the market class 
 *market stores all active item listings
 */


#include "Marketplace.h"

Marketplace::Marketplace() {} //constructor (just init obj)

void Marketplace::addItem(const Item& item)		//adds new item listing to marketplace
{
	listings.push_back(item);			
}

//return list of items in market
std::list<Item> Marketplace::getListings(int sortOption) const
{	
	return listings;				//return no sort
}

void Marketplace::refresh(Userbase& userbase) {
	//check if any items are expired or sold to remove them from marketplace close auction should handle all of the user logic
	for (auto it = listings.begin(); it != listings.end(); ) {
		if (it->isExpired()) {
			it->closeAuction(userbase);
			it = listings.erase(it);
			continue;
		}
		if (it->isSold()) {
			it = listings.erase(it);
			continue;
		}
		++it;
	}

}

