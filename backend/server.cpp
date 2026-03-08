/* server.cpp
 * Stress test
 * Generates 1000 items and adds random bids to each
 * 
 */ 


#include <iostream> 
#include <cstdlib> 
#include <ctime> 

#include "Marketplace.h"
#include "User.h"
#include "Item.h"

int main()
{
	std::srand(std::time(nullptr));

	Marketplace market;					//marketplace obj
	User seller("seller", "password", "seller@email.com");	//create a user 
	
	//stress test generates 1000 items
	for(int i = 0; i< 1000;i++)
	{
		//create an Item with unique name(item0...item999), random buy-now price
		Item item("Item" + std::to_string(i), "Random Description", rand() % 100 + 50, seller);
		
		//this loop generates the random bidding
		for(int j=0; j<3; j++)
		{
			double bid = rand() % 200 + 20; //generates a number
			item.addBid(bid);		//adding bid to priority queue in bid.h
		}

		market.addItem(item);			//sends item to market
	}

	std::cout<<"Stress test completed with 1000 items." << std::endl;
	return 0; 
}
	
