install dependencies

sudo apt-get install libpq-dev python3-dev
# What is it?

This is a general purpose api service that the frontend uses with to communicate
with the OpenAI Api, our database, etc. 



# How to set it up?

## Prequisites

First, you need to have the database setup. Navigate to the /database directory for more information

## Next steps

Then, you need to export an open AI api key in your .bashrc like so:

```
export OPENAI_API_KEY=<api key>
```

Then, if you aren't already, install python 3.9.1 (later versions should be fine, but if you get any weird errors this could be a starting point). navigate the the /api_service_proj folder in your terminal.
There, you need to create a pip virtual environment, activate it, and install all the dependencies
with these commands:

```
python3.9 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Once you've done that, you can start the api service from the api_service_proj folder with the following command.

```
python3 app.py
```