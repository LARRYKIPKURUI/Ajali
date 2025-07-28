from flask import Blueprint, jsonify
from utils.sms import send_sms

test_sms_bp = Blueprint("test_sms", __name__)

@test_sms_bp.route('/test-sms', methods=['GET'])
def test_sms():
    try:
        send_sms(
            to="+254786197407",  # Your own number in international format
            body="This is a test SMS from the Ajali Emergency System."
        )
        return jsonify({"message": "Test SMS sent successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
