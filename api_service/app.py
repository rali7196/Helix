from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/api/v1/addUser', methods=['POST'])
def addUser():
    data = request.get_json()
    print(data)
    return jsonify({"responseCode": 0})