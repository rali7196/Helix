from flask import Flask, jsonify, request
from flask_cors import CORS

from . import db, user_management, llm_management


def create_app():
    app = Flask(__name__)
    CORS(app)

    db.init_db(app)
    app.register_blueprint(user_management.bp)
    app.register_blueprint(llm_management.bp)

    
    return app