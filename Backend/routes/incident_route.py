import os
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.models import User, Incident, Media
from services.cloudinary_service import upload_file
from utils.notification_utils import send_sms, send_email
from utils.geolocation_utils import reverse_geocode
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError

incident_bp = Blueprint("incidents", __name__)

# Reverse geocode utility
def reverse_geocode(lat, lon):
    geolocator = Nominatim(user_agent="ajali_app")
    try:
        location = geolocator.reverse((lat, lon), timeout=10)
        return location.address if location else None
    except (GeocoderTimedOut, GeocoderServiceError):
        return None

@incident_bp.route("", methods=["POST"])
@jwt_required()
def create_incident():
    identity = get_jwt_identity()
    user = User.query.get(identity["id"])

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Ensure all required fields are present
    required_fields = ["type", "title", "description", "latitude", "longitude"]
    for field in required_fields:
        if not request.form.get(field):
            return jsonify({"error": f"'{field}' is required"}), 400

    if "file" not in request.files:
        return jsonify({"error": "Media file is required"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Extract form data
    incident_type = request.form["type"]
    title = request.form["title"]
    description = request.form["description"]
    latitude = float(request.form["latitude"])
    longitude = float(request.form["longitude"])
    is_critical = request.form.get("is_critical", "false").lower() == "true"

    # Reverse geocode
    location_description = reverse_geocode(latitude, longitude)

    # Create Incident
    incident = Incident(
        type=incident_type,
        title=title,
        description=description,
        latitude=latitude,
        longitude=longitude,
        is_critical=is_critical,
        user_id=user.id,
        location_description=location_description
    )

    db.session.add(incident)
    db.session.flush()  # Access incident.id before committing

    # Upload media to Cloudinary
    upload_result = upload_file(file)
    if not upload_result:
        db.session.rollback()
        return jsonify({"error": "Failed to upload file to Cloudinary"}), 500

    media = Media(
        media_type=upload_result["resource_type"],
        url=upload_result["secure_url"],
        public_id=upload_result["public_id"],
        user_id=user.id,
        incident_id=incident.id
    )

    db.session.add(media)
    db.session.commit()

    # Notification content
    notif_msg = f"""
    🚨 New Incident Reported 🚨
    Title: {incident.title}
    Location: {incident.location_description or f"{incident.latitude}, {incident.longitude}"}
    Reported By: {user.username}
    """

    send_email("Ajali Alert: New Incident", notif_msg)
    send_sms(notif_msg)

    return jsonify({
        "message": "Incident reported successfully",
        "incident": {
            "id": incident.id,
            "type": incident.type,
            "title": incident.title,
            "description": incident.description,
            "latitude": incident.latitude,
            "longitude": incident.longitude,
            "location_description": incident.location_description,
            "is_critical": incident.is_critical,
            "status": incident.status,
            "user_id": incident.user_id,
            "created_at": incident.created_at.isoformat()
        },
        "media": media.to_dict()
    }), 201
