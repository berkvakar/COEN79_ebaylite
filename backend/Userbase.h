/**Userbase.h
 * an unordered map of users, with the username as the key and the User object as the value
 * 
 * 
 */

#ifndef USERBASE_H
#define USERBASE_H
#include <unordered_map>
#include "User.h"

class Userbase {
    private:
        std::unordered_map<std::string, User> users; // Key: username, Value: User object
    public:
        Userbase();
        void addUser(const User& user);
        User* getUser(const std::string& username);
        bool userExists(const std::string& username) const;
};

#endif // USERBASE_H