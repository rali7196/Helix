import json

from ..utils.utils import Utils

class Executor:
    helixAgent = None

    def __init__(self, helixAgent):
        self.helixAgent = helixAgent

    def ask_followup(self):
        prompt = f"""
            You are an assistant helping recruiters create outreach sequences. Earlier, you determined that 
            you did not have enough information to generate new steps. Given this information:

            Conversation so far:
            {self.helixAgent.conversation}

            Known information:
            {json.dumps(self.helixAgent.known_info, indent=2)}

            Sequence steps generated so far:
            {self.helixAgent.sequence}

            Reply with a new follow up question to ask the user in the following JSON format. Ideally, ask
            a question that requests all of the missing information:
            {{
                "newMessage": string 
            }}
        """

        llm_response = self.helixAgent.client.responses.create(
            model="gpt-4o",
            input=prompt
        )

        parsed_llm_response = Utils.extract_json_from_text(llm_response.output_text)

        return parsed_llm_response
    
    def generate_steps(self):
        prompt = f"""
        You are an expert assistant designed to help recruiters craft high-converting recruiting outreach sequences.

        You are going to be given the conversation history, and the known information I, your creator, has deemed 
        relevant to creating recruiting outreach sequences. 

        Conversation so far:
        {self.helixAgent.conversation}

        Known information:
        {json.dumps(self.helixAgent.known_info, indent=2)}

        A recruiting outreach sequence is a series of 3–5 messages designed to:
        - Introduce the opportunity
        - Personalize the message to the candidate’s interests
        - Build rapport
        - Encourage a response

        You will be given a `known_info` object that contains structured information about the candidate, the role, and the company.

        Your task is to generate a complete outreach sequence using this information.

        Each step should:
        - Be a short, engaging message (1–3 sentences)
        - Match the desired tone (e.g. friendly, professional, witty)
        - Build naturally from the previous message
        - Reference relevant key selling points or candidate pain points

        Respond only with a JSON object in the following format, where new_message is 
        a message sent to the user indicating that you have generated steps, and steps being the steps 
        you generated:

        ```json
        {{
            "new_message": string
            "steps": [
                "Step 1 message here...",
                "Step 2 message here...",
                ...
            ]
        }}
        """

        llm_response = self.helixAgent.client.responses.create(
            model="gpt-4o",
            input=prompt
        )

        parsed_llm_response = Utils.extract_json_from_text(llm_response.output_text)

        return parsed_llm_response
