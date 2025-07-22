from flask import Blueprint, jsonify
from utils.email import send_email

test_email_bp = Blueprint("test_email_bp", __name__)

@test_email_bp.route('/test-email', methods=['GET'])
def test_email():
    try:
        send_email(
            recipient="githinjikelvin74@gmail.com",
            subject="Ajali System Email Test",
            body="✅ This is a test email from the Ajali Emergency Backend System."
        )
        return jsonify({"message": "Test email sent successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
