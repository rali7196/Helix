from flask import Flask, Blueprint, jsonify, request
from openai import OpenAI
import re
import json

from.agent.core.helix_agent import HelixAgent

bp = Blueprint("llm_management", __name__, url_prefix="/llmManagement")

@bp.route("/chat", methods = ["POST"])
def chat():
    data = request.get_json()
    conversation = data['conversation']
    sequence = data['steps']

    OpenAiClient = OpenAI()
    helixAgent = HelixAgent(client = OpenAiClient, conversation = conversation, sequence = sequence)
    
    response = helixAgent.start_execution_loop(10)

    response = jsonify(response)
    print(response)
    return response