#ifndef USER_H
#define USER_H

#include <string>
#include <vector>

class Item;   // forward declaration

class User {

private:
    std::string username;
    std::string password;
    std::string email;

    std::vector<Item*> history;
    std::vector<Item*> watchlist;

    std::vector<Item*> sold;
    std::vector<Item*> bids;

public:
    User() = default;

    User(std::string username, std::string password)
        : username(username), password(password) {}

    
    std::string getUsername() const;
    void setUsername(const std::string& username);

    std::string getPassword() const;
    void setPassword(const std::string& password);

    void addToHistory(Item* entry);
    void addToWatchlist(Item* entry);

    void addSoldItem(Item* item);
    void addBidItem(Item* item);

    const std::vector<Item*>& getHistory() const;
    const std::vector<Item*>& getWatchlist() const;
    const std::vector<Item*>& getSold() const;
    const std::vector<Item*>& getBids() const;
};

#endif
