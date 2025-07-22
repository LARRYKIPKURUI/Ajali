from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.models import Incident, Notification, User
from app.utils.notification_utils import send_email_notification, send_sms_notification

incident_bp = Blueprint("incident", __name__)

@incident_bp.route('/report', methods=['POST'])
def report_incident():
    data = request.get_json()
    user_id = data.get("user_id")

    incident = Incident(
        title=data["title"],
        description=data["description"],
        latitude=data["latitude"],
        longitude=data["longitude"],
        address=data.get("address"),
        incident_type=data["incident_type"],
        severity=data.get("severity"),
        user_id=user_id
    )
    db.session.add(incident)
    db.session.commit()

    user = User.query.get(user_id)
    message_body = f"Incident reported: {incident.title} at {incident.address or 'unknown location'}."

    # Send Email
    email_success, email_status = send_email_notification(
        user.email,
        "Ajali Alert: Incident Reported",
        message_body
    )

    db.session.add(Notification(
        method='email',
        recipient=user.email,
        message=message_body,
        status='sent' if email_success else 'failed',
        incident_id=incident.id
    ))

    # Send SMS to emergency contact
    if user.emergency_contact_phone:
        sms_success, sms_status = send_sms_notification(
            user.emergency_contact_phone,
            f"Ajali Alert: {user.username} reported an incident!"
        )

        db.session.add(Notification(
            method='sms',
            recipient=user.emergency_contact_phone,
            message=message_body,
            status='sent' if sms_success else 'failed',
            incident_id=incident.id
        ))

    db.session.commit()

    return jsonify({"message": "Incident reported and notifications sent."}), 201
