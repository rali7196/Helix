from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/test')
def addUser():
    print("incoming request")
    return jsonify({"response": "test successful"})