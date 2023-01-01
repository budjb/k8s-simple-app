import psycopg
import os
from contextlib import contextmanager

# On load, read the DB connection string from the environment. If it's not set or is empty,
# an exception will be raised.
_connection_string = os.environ.get("DB_CONNECTION")

if not _connection_string:
    raise Exception(
        "The DB_CONNECTION environment variable must be set as a PostgreSQL connection string"
    )


def list_pets():
    """
    Performs a database query to collect all pets and returns a list of
    pets as dictionaries.
    """
    with _get_connection() as connection:
        results = connection.execute("SELECT * FROM pets").fetchall()
        return [_marshall_record(record) for record in results]


@contextmanager
def _get_connection():
    """
    Yields a database connection object to the caller. When used with "with",
    the database connection will automatically be cleaned up.
    """
    with psycopg.connect(_connection_string) as connection:
        yield connection


def _marshall_record(record):
    """
    Given a database row tuple, converts the database response to a dictionary
    with appropriately named keys. This method assumes column order as returned
    by "SELECT * FROM pets".
    """
    return {"name": record[0], "type": record[1]}
