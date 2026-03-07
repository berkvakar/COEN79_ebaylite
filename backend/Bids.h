/** Bids.h
 * priority queue for fast access to the highest bid for an item
 * 
 */

#ifndef BIDS_H
#define BIDS_H
#include <queue>
#include "User.h"
#include "Item.h"

class Bids {
private:
    std::priority_queue<double> bidQueue; // Assuming bids are represented as doubles
public:
    void addBid(double bid);
    double getHighestBid() const;
    bool isEmpty() const;
};

#endif // BIDS_H