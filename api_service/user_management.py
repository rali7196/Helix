from flask import (g, jsonify, request, Blueprint)
from sqlalchemy import text, create_engine

from . import db

bp = Blueprint('user_management', __name__, url_prefix='/userManagement')
@bp.route('/addUser', methods=['POST'])
def add_user():
    data = request.get_json()
    engine = db.get_db()
    print(data)
    with engine.connect() as conn:
        result = conn.execute(text("select 'hello world'"))
        print(result.all())
    return jsonify({"responseCode": 0})