from flask import (g, jsonify, request, Blueprint)
from sqlalchemy import text
from sqlalchemy.orm import Session

from . import db
from .database_client.database_client import Database_Client
from .data_models.session import HelixSession

bp = Blueprint('user_management', __name__, url_prefix='/userManagement')
@bp.route('/addUser', methods=['POST'])
def add_user():
    data = request.get_json()
    print(data)
    database_client = Database_Client()
    new_user = database_client.add_user(data['name'], data['email'])
    return jsonify({"responseCode": 0})

@bp.route('/getUser', methods=["POST"])
def get_user():
    data = request.get_json()
    database_client = Database_Client()
    user = database_client.get_user_by_email(data['email'])
    return jsonify({"responseCode": 0})

@bp.route('/getHelixSession', methods=['POST'])
def get_helix_session():
    data = request.get_json()
    database_client = Database_Client()
    session: HelixSession = database_client.get_session_for_user(data['email'])[0]
    return jsonify({"id":session.session_id, 
                    "user_id":session.user_id, 
                    "conversation_history":session.conversation_history, 
                    "steps":session.outreach_sequence})

@bp.route('/updateSequence', methods=['POST'])
def update_sequence():
    data = request.get_json()

    database_client = Database_Client()
    with Session(database_client.engine):
        database_client.update_session(data['id'], data['conversation'], data['steps'])
    return jsonify({"responseCode": 0})


