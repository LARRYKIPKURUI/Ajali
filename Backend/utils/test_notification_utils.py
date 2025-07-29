# utils/test_notification_utils.py

from flask import Blueprint, jsonify
from utils.notification_utils import send_email, send_sms

test_email_bp = Blueprint('test_email_bp', __name__)
test_sms_bp = Blueprint('test_sms_bp', __name__)

@test_email_bp.route('/test-email')
def test_email():
    try:
        send_email(
            to="test@example.com",
            subject="Test Email",
            body="<p>This is a test email.</p>"
        )
        return jsonify({'message': 'Test email sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@test_sms_bp.route('/test-sms')
def test_sms():
    try:
        send_sms(
            phone_number="+254712345678",
            message="This is a test SMS"
        )
        return jsonify({'message': 'Test SMS sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

__all__ = ["test_email_bp", "test_sms_bp"]
# This file contains test routes for sending email and SMS notifications.
# It uses Flask blueprints to define routes for testing email and SMS functionalities.
