from typing import List
from sqlalchemy import ARRAY, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
class HelixSession(Base):
    __tablename__ = "sessions"
    session_id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer())
    preliminary_information: Mapped[str] = mapped_column(String())
    conversation_history: Mapped[list[str]] = mapped_column(ARRAY(String()))
    outreach_sequence: Mapped[list[str]] = mapped_column(ARRAY(String()))

