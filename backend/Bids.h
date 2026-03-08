/** Bids.h
 * priority queue for fast access to the highest bid for an item
 * 
 */

#ifndef BIDS_H
#define BIDS_H
#include <queue>

class Bids {
private:
    std::priority_queue<std::pair<double, std::string>> bidQueue; // Assuming bids are represented as doubles
public:
    void addBid(double bid, const std::string& bidderUsername); //O(log n) to add a bid
    double getHighestBid() const; //O(1) access to the highest bid
    bool isEmpty() const; 
};

#endif // BIDS_H
