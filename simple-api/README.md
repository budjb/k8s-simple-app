# Simple API

This is a Flask-based Python application that will serve a list of pets through
a RESTful API. The application only exposes a single API as the root of the
service, which will return the list of pets as a list of JSON object.

The application requires a PostgreSQL database to connect to, which must already
have the required table and data present (see the [SQL init script](../simple-db/init.sql)).

The application may be run locally by executing the [local.py](src/local.py) file.
This is not suitable for a production run, and the application must be run through
a WSGI server when deployed.

To run the application, the `DB_CONNECTION` environment variable must be set. This will
inform the application how to connect to the database. The string must be a valid
PostgreSQL connection URI in the following shape:

```
postgresql://[user]:[password]@[host]:[port]/[database name]
```
