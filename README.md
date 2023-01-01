# Simple Kubernetes App

This repository contains a very basic application that's suitable for use as a simple yet real-life example
of an application that may be hosted in Kubernetes. The application is split up between an API layer and a UI.
It uses PostgreSQL as its database.

## Database

The `simple-db` directory contains a SQL initialization script that creates the required table and inserts
some entries into that table. The SQL script must be run when the PostgreSQL server starts, which is supported
by the official Docker image.

An image must be built that adds the required SQL init script and sets the database name, user, and password.

## API

The `simple-api` directory contains a Flask-based Python application that exposes a single API endpoint at
the root of the service. This API will query the database for all entries and returns them as a list of JSON
objects. Additionally, the response will contain the `X-Source-Host` custom header which will contain the
hostname of the server running the application.

An image must be built that runs the application with a WSGI server.

## UI

The `simple-ui` directory contains a React-based front-end that interacts with the API service. If the API
service is available, a table containing a list of pets will display. Otherwise, an error will be displayed.

An image must be built that will serve the static assets of the UI that were created from a build of the
React application. Nginx is a great candidate to use as a simple server for these files. 
