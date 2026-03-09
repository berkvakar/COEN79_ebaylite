/** Logs.h
 *  A class to hold all logs app wide in a vector of strings, with methods to add and retrieve logs
 * 
 * 
 */
#ifndef LOGS_H
#define LOGS_H

#include <string>
#include <vector>

class Logs {
    private:
        std::vector<std::string> logs; // Vector to store all logs
    public:
        void addLog(const std::string& log); // Method to add a log entry
        std::vector<std::string> print() const; // Method to retrieve all logs
};


#endif // LOGS_H