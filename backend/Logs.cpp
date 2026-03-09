/* Logscpp
 *
 * Implements the Log class
 * Stores sys activity log using vector of strings
 */


#include "Logs.h"

void Logs::addLog(const std::string& log)
{
	logs.push_back(log);
}

std::vector<std::string> Logs::getLogs() const
{
	for(const auto& log : logs)
	{
		std::cout << log << std::endl;
	}
}

std::
