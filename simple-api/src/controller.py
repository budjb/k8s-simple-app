from flask import Flask, jsonify, request, g
from flask_cors import CORS

import pet_dao

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def list_pets():
    return jsonify(pet_dao.list_pets())
