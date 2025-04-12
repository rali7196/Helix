from typing import Optional
from sqlalchemy import String
from .base import Base
from sqlalchemy.orm import mapped_column, Mapped

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    company_name: Mapped[Optional[str]] = mapped_column(String())
    email: Mapped[str] = mapped_column(String())
    name: Mapped[str] = mapped_column(String())