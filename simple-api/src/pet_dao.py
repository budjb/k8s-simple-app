import psycopg
from contextlib import contextmanager


def list_pets():
    with _get_connection() as connection:
        results = connection.execute("SELECT * FROM pets").fetchall()

        return [_marshall_record(record) for record in results]


@contextmanager
def _get_connection():
    with psycopg.connect(
        "postgresql://petstore:mypass@localhost:5433/petstore"
    ) as connection:
        yield connection


def _marshall_record(record):
    return {"name": record[0], "type": record[1]}
