from flask import Flask, jsonify, request
from flask_cors import CORS
import os

from .main_modules import user_management, llm_management
from .db import init_db


def create_app():
    app = Flask(__name__)
    CORS(app)

    print(os.getenv("DB_URL"))
    db.init_db(app)
    app.register_blueprint(user_management.bp)
    app.register_blueprint(llm_management.bp)

    
    return app