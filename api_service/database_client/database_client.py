from sqlalchemy import text
from sqlalchemy.orm import Session

from .. import db
from ..data_models import User

class Database_Client:
    engine = None
    def __init__(self):
        self.engine = db.get_db()

    def add_user(self, name: str, email: str):
        with Session(self.engine) as session:
            new_user = User(company_name = "helix", name = name, email = email)
            result = session.add(new_user)
