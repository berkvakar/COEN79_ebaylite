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

Marketplace::refresh(){
	//check if any items are expired
	for(int i = 0; i < listings.size(); i++) {
		if(listings[i].isExpired()) {
			listings[i].closeAuction();
		}
		//if item is sold, remove it from listings
		if(listings[i].isSold()) {
			listings.erase(listings.begin() + i);
			i--;
		}
	}
}
void Marketplace::closeAuction()
{
    for(auto &item : listings)
    {
        if(!item.isSold() && item.isExpired())
        {
            item.closeAuction();
        }
    }
}

