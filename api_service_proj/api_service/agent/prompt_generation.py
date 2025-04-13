class Prompt_Generator:
    @staticmethod
    def generate_prompt(conversation, steps):
        prompt = """
            You are an agent designed to help recruiters by generating recruiting 
            outreach sequences. A recruiting outreach sequence is a series of messages
            designed to engage candidates and ellicit a response from them. You are going to be 
            given the conversation history, alongside the steps you have generated. Before you generate the
            steps, make sure you have enough information to actually generate the steps, don't be afraid
            to ask clarifying questions. Whether you have determined if there is enough information
            to determine if you should generate a new step or not, always reply with this JSON format:
            {
                new message: string,
                steps: []
            }
            where new message is a string that you want to reply with, and steps is the steps you have decided
            to generate. 

            Below is the conversation history you have had with the user\n\n
        """ + ' '.join(conversation) + "\n\nAnd these are the steps you have decided to generate" + ' '.join(steps)
        return prompt