from sqlalchemy import inspect, select, update
from sqlalchemy.orm import Session
import uuid

from .. import db
from ..data_models.user import User
from ..data_models.session import HelixSession

class Database_Client:
    engine = None
    def __init__(self):
        self.engine = db.get_db()

    def add_user(self, name: str, email: str):
        new_user_id = uuid.uuid4()

        if (not self.is_new_user(email)):
            return
        with Session(self.engine) as session:
            new_user = User(id = new_user_id, company_name = "helix", name = name, email = email)
            session.add(new_user)
            session.commit()
            
            new_session = self.add_session(new_user_id, [], [])

            return new_user

    def get_user_by_email(self, email):
        stmt = select(User).where(User.email == email)
        with Session(self.engine) as session:
            return session.execute(stmt).first()
        
    def add_session(self, user_id, conversation_history, outreach_sequence):
        with Session(self.engine) as session:
            new_session = HelixSession(
                session_id = uuid.uuid4(), 
                user_id = user_id,  
                preliminary_information = "", 
                conversation_history = conversation_history, 
                outreach_sequence = outreach_sequence)
            
            session.add(new_session)
            session.commit()

            return new_session
        
    def get_session_for_user(self, email):
        with Session(self.engine) as session:
            user: User = self.get_user_by_email(email)

            stmt = select(HelixSession).where(HelixSession.user_id == user[0].id)
            result = session.execute(stmt).first()
            return result
        
    def update_session(self, id, conversation, steps):
        with Session(self.engine) as session:
            stmt = update(HelixSession).where(HelixSession.session_id == id).values(conversation_history = conversation, outreach_sequence = steps)
            session.execute(stmt)
            session.commit()

    def is_new_user(self, email):
        stmt = select(User).where(User.email == email)
        with Session(self.engine) as session:
            result = session.execute(stmt)
            counter = 0
            for row in result:
                counter += 1
                if (counter > 1):
                    return False
            return True

