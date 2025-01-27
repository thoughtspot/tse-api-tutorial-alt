# This file will retrieve a liveboard GUID and then get the SQL for all the visualizations in the liveboard.

import json
import requests
import sqlparse
from typing import Tuple

from thoughtspot_rest_api_v1 import *

# Constants

# Lesson 1 - set the constants
tsURL = "https://training.thoughtspot.cloud"
username = "userxyz"
password = "password123"
org_id = 0  # Get the org ID from the playground using GET /api/rest/2.0/auth/session/user


# Lesson 2 - create the authenticated client
def create_api_client() -> TSRestApiV2:
    """
    Creates a new TSRestApiV2 client that can be used for calls to ThoughtSpot.
    :return: A TSRestApiV2 client that can be used for calls to ThoughtSpot.
    """
    # Try to request token from /auth/token/full and then use token to be the bearer_token of the TSRestApiV2 obj
    try:
        print("Connecting to ThoughtSpot")
    except requests.exceptions.HTTPError as e:
        show_api_error_and_exit(e)


# Lesson 3 - Get a GUID for the liveboard to use
def get_liveboard_guid(ts: TSRestApiV2, liveboard_name: str) -> str:
    """
    Retrieves the GUID for a liveboard with the given name.  If there are multiple, returns the first one.
    :param ts: A TSRestApiV2 client for making calls.
    :param liveboard_name: The name of the liveboard to search for.
    :return: A single GUID for the first liveboard that matches the name.
    """
    print(f'getting GUID for {liveboard_name}')

    return ""


# Lesson 4 - For the liveboard, get the SQL for each visualization.
def get_liveboard_sql(ts: TSRestApiV2, liveboard_guid: str) -> List[Tuple[str, str]]:
    """
    Returns the SQL queries for each visualization in a liveboard.  Each returned value is a tuple with the ID and
    SQL for the visualization.
    :param ts: A TSRestApiV2 client for making calls.
    :param liveboard_guid: The GUID for the liveboard.
    :return: An array of (ID, SQL) tuples
    """
    print(f'getting the SQL for {liveboard_guid}')

    queries = []

    if not liveboard_guid:
        return queries

    print(f'Getting SQL for liveboard with GUID {liveboard_guid}')
    return queries


# Lesson 5 - Print the results
def print_sql(sql: List[Tuple[str, str]]) -> None:
    """
    Prints the vizID and SQL to the console.
    :param sql: The list of (ID, SQL) tuples
    """

    for title, query in sql:
        print(f"{title}:")
        # Use sqlparse to format the SQL query
        formatted_query = sqlparse.format(query, reindent=True, keyword_case="upper")

        print(formatted_query)
        print()  # Add a blank line between entries


def show_api_error_and_exit(error) -> None:
    """
    Shows the details of the error and then exits the program.
    :param error: An HTTP error.
    """
    print("Error from the API: ")
    print(error)
    print(error.response.content)
    exit()


if __name__ == '__main__':
    ts = create_api_client()
    guid = get_liveboard_guid(ts, liveboard_name="Sales Performance")
    sql = get_liveboard_sql(ts, liveboard_guid=guid)
    print_sql(sql)
