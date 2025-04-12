from flask import Flask, Blueprint, jsonify, request
from openai import OpenAI
import re
import json

from .prompt_generation.prompt_generation import Prompt_Generator

bp = Blueprint("llm_management", __name__, url_prefix="/llmManagement")

def extract_json_from_text(text):
    # Match the first JSON object in the text
    match = re.search(r"(\{.*?\})", text, re.DOTALL)
    if not match:
        raise ValueError("No JSON found in the text.")
    
    json_str = match.group(1)
    print("json string: ", json_str)
    return json.loads(json_str)

@bp.route("/chat", methods = ["POST"])
def chat():
    client = OpenAI()
    data = request.get_json()
    conversation = data['conversation']
    steps = data['steps']

    print(conversation, steps)

    prompt = Prompt_Generator.generate_prompt(conversation, steps)

    llm_response = client.responses.create(
        model="gpt-4o",
        input=prompt
    )

    print(llm_response.output_text)
    print("-------------response-----------------")
    extracted_fields = extract_json_from_text(llm_response.output_text)
    new_steps = steps + extracted_fields['steps']
    response = jsonify({"conversation": extracted_fields['new message'], "steps": new_steps})
    print(response)
    return response