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
std::vector<Item> Marketplace::getListings(int sortOption) const
{	
	return listings;				//return no sort
}
