from flask import Flask, jsonify, make_response
from flask_cors import CORS
import platform
import pet_dao

app = Flask(__name__)
CORS(app, expose_headers=["X-Source-Host"])


@app.route("/", methods=["GET"])
def list_pets():
    """
    API endpoint that returns a complete list of pets in the database.

    The response will contain the X-Source-Host header whose value is the
    hostname of the server running the application.
    """
    res = make_response(jsonify(pet_dao.list_pets()))
    res.headers["X-Source-Host"] = platform.node()
    return res
