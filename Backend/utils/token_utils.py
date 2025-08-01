from flask_jwt_extended import create_access_token, decode_token
from datetime import timedelta

def generate_token(identity):
    return create_access_token(identity=identity, expires_delta=timedelta(days=1))

def verify_token(token):
    try:
        return decode_token(token)
    except Exception:
        return None
