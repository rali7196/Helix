import json

from ..utils.utils import Utils

class Planner:
    helix_agent = None

    def __init__(self, helix_agent):
        self.helix_agent = helix_agent

    def plan(self):
        prompt = f"""
            You are an assistant helping recruiters create outreach sequences.

            Conversation so far:
            {self.helix_agent.conversation}

            Known information:
            {json.dumps(self.helix_agent.known_info, indent=2)}

            Sequence steps generated so far:
            {self.helix_agent.sequence}

            Rules:
            - If required info is missing, respond with one question to get it.
            - If most of the known information dictionary is filled out, generate the next step (e.g. intro, follow-up, bump).
            - If there are any sequence steps generated, take some extra time to consider whether you need to actually generate a new sequence or just edit the current one

            Always reply in this JSON format:
            {{
            "newMessage": "...",
            "action": "ask_user" | "generate_steps" | "edit_steps"",
            }}
            """
        
        llm_response = self.helix_agent.client.responses.create(
            model="gpt-4o",
            input=prompt
        )

        parsed_llm_response = Utils.extract_json_from_text(llm_response.output_text)

        return parsed_llm_response