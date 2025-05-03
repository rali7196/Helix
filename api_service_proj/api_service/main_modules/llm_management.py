from flask import Flask, Blueprint, jsonify, request
from sqlalchemy.orm import Session
from openai import OpenAI
import re
import json

from ..agent.core.helix_agent import HelixAgent
from ..database_client.database_client import Database_Client
from ..data_models.session import HelixSession

bp = Blueprint("llm_management", __name__, url_prefix="/llmManagement")

@bp.route("/chat", methods = ["POST"])
def chat():
    data = request.get_json()
    conversation = data['conversation']
    sequence = data['steps']
    email = data['email']

    print(sequence)

    OpenAiClient = OpenAI()
    helixAgent = HelixAgent(client = OpenAiClient, conversation = conversation, sequence = sequence)
    
    response = helixAgent.start_execution_loop(10)

    database_client = Database_Client()
    with Session(database_client.engine):
        user = database_client.get_user_by_email(email = email)
        session: HelixSession = database_client.get_session_for_user(user[0].email)[0]
        conversation.append(response['newMessage'])
        database_client.update_session(session.session_id, conversation, response['steps'])

    response = jsonify(response)
    print(response)
    return response