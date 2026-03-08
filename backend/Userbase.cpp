#include "Userbase.h"

Userbase::Userbase() {}

void Userbase::addUser(const User& user)
{
    users[user.getUsername()] = user;
}

User* Userbase::getUser(const std::string& username)
{
    auto it = users.find(username);

    if(it != users.end())
        return &(it->second);

    return nullptr;
}

bool Userbase::userExists(const std::string& username) const
{
    return users.find(username) != users.end();
}
