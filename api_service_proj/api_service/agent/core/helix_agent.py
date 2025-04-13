import json
import re
from openai import OpenAI

from ...utils.utils import Utils

from ..planner import Planner
from ..executor import Executor

class HelixAgent:
    known_info = {
        "candidate_name": None,
        "role": None,
        "company": None,
        "desired_tone": None,
        "key_selling_points": [],
    }
    client = None
    conversation = None
    sequence = None
    planner = None
    executor = None
    thought_process = []

    system_prompt = """
        You are an assistant that is supposed to help recruiters generate recruiting outreach sequences
    """

    def __init__(self, client: OpenAI, conversation, sequence):
        self.client = client
        self.conversation = conversation
        self.sequence = sequence
    
    def update_known_info(self):
        prompt = f"""
            {self.system_prompt}

            Right now your task is to update an memory object called known_info to help your future self
            generate a recruiting outreach sequence. 

            You will be given:
            - The conversation history between the user and the assistant
            - The current outreach sequence steps that have been generated
            - The current `known_info` object

            Conversation so far:
            {self.conversation}

            Sequence steps generated so far:
            {self.sequence}

            Known information:
            {json.dumps(self.known_info, indent=2)}

            Your job is to:
            1. Extract any new relevant information from the conversation or steps.
            2. Fill in or update the `known_info` object where appropriate.
            3. Keep existing values if there's no new or better information.
            4. Return a complete `known_info` object in JSON format — no explanations or extra text.

            Use the following JSON schema as a guide:

            ```json
            {{
            "candidate_name": string | null,  // e.g. "Alex", or null if unknown
            "role": string | null,            // e.g. "Backend Engineer"
            "company": string | null,         // e.g. "Stripe"
            "desired_tone": string | null,    // e.g. "friendly", "professional", "funny"
            "key_selling_points": string[],   // e.g. ["strong engineering culture", "fast growth"]
            }}
        """

        llm_response = self.client.responses.create(
            model="gpt-4o",
            input=prompt
        )

        print(llm_response.output_text)

        parsed_llm_response = Utils.extract_json_from_text(llm_response.output_text)

        return parsed_llm_response
            
    def start_execution_loop(self, maximum_retries: int):
        self.planner = Planner(self)
        self.executor = Executor(self)
        for _ in range(maximum_retries):
            try:
                print("---------------NEW RETRY-----------------------")

                # update known info
                self.known_info = self.update_known_info()

                print("-----------KNOWN INFO-----------------")
                print(self.known_info)
                # plan what to do next
                print("-----------START OF PLANNING--------------")
                plan = self.planner.plan()
                print("---------------FINAL PLAN-----------------")
                print(plan)
                # execute an action
                next_action = plan["action"]

                if (next_action == "ask_user"):
                    response = self.executor.ask_followup()
                    response["steps"] = self.sequence

                    return response

                if (next_action == "generate_steps"):
                    response = self.executor.generate_steps()
                    return response
                # TODO: add action if user wants to edit the recruiting sequence



                plan_response = self.plan()
                Utils.extract_json_from_text(plan_response)
                
            except Exception as e:
                print(e)
                continue



