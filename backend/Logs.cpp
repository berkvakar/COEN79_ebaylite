/* Logscpp
 *
 * Implements the Log class
 * Stores sys activity log using vector of strings
 */


#include "Logs.h"
#include <iostream>

void Logs::addLog(const std::string& log)
{
	logs.push_back(log);
}

void Logs::printLogs()
{
	for(const auto& log : logs)
	{
		std::cout << log << std::endl;
	}
	logs.clear();
}

