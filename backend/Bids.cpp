#include "Bids.h"
#include <string>

Bids::Bids() {
    bidQueue = std::priority_queue<std::pair<double, std::string>>();
}

void Bids::addBid(double bid, const std::string& bidderUsername)
{
    bidQueue.push(std::make_pair(bid, bidderUsername));
}

double Bids::getHighestBid() const
{
    if(!bidQueue.empty())
        return bidQueue.top().first;
    return 0.0;
}

bool Bids::isEmpty() const
{
    return bidQueue.empty();
}

std::vector<std::pair<double, std::string>> Bids::getAllBids() const //O(n log n) to retrieve all bids sorted
{
    std::vector<std::pair<double, std::string>> allBids;
    std::priority_queue<std::pair<double, std::string>> tempQueue = bidQueue; // Create a copy to preserve original

    while(!tempQueue.empty())
    {
        allBids.push_back(tempQueue.top());
        tempQueue.pop();
    }

    return allBids;
}