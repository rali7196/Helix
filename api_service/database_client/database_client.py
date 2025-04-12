from sqlalchemy import select
from sqlalchemy.orm import Session
import uuid

from .. import db
from ..data_models.user import User

class Database_Client:
    engine = None
    def __init__(self):
        self.engine = db.get_db()

    def add_user(self, name: str, email: str):
        if (not self.is_new_user(email)):
            return
        with Session(self.engine) as session:
            print('failed')
            new_user = User(id = uuid.uuid4(), company_name = "helix", name = name, email = email)
            session.add(new_user)
            session.commit()

    def get_user_by_email(self, email):
        stmt = select(User).where(email == email)
        with Session(self.engine) as session:
            return session.execute(stmt)
    
    def is_new_user(self, email):
        stmt = select(User).where(email == email)
        with Session(self.engine) as session:
            result = session.execute(stmt)
            counter = 0
            for row in result:
                counter += 1
                if (counter > 1):
                    return False
            return True

