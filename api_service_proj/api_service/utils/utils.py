import json
import re

class Utils:
    @staticmethod
    def extract_json_from_text(text):
        # Match the first JSON object in the text
        match = re.search(r"(\{.*?\})", text, re.DOTALL)
        if not match:
            raise ValueError("No JSON found in the text.")
        
        json_str = match.group(1)
        print("json string: ", json_str)
        return json.loads(json_str)