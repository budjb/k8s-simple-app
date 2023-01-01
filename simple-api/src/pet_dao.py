import psycopg
from contextlib import contextmanager


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
    with psycopg.connect(
        "postgresql://petstore:mypass@localhost:5433/petstore"
    ) as connection:
        yield connection


def _marshall_record(record):
    """
    Given a database row tuple, converts the database response to a dictionary
    with appropriately named keys. This method assumes column order as returned
    by "SELECT * FROM pets".
    """
    return {"name": record[0], "type": record[1]}
