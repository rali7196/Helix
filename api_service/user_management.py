from flask import (g, jsonify, request, Blueprint)
from sqlalchemy import text

from . import db
from .database_client.database_client import Database_Client

bp = Blueprint('user_management', __name__, url_prefix='/userManagement')
@bp.route('/addUser', methods=['POST'])
def add_user():
    data = request.get_json()
    print(data)
    database_client = Database_Client()
    database_client.add_user(data['name'], data['email'])

    return jsonify({"responseCode": 0})