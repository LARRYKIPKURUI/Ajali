from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.models import User, Incident, Media
from services.cloudinary_service import upload_file

incident_bp = Blueprint("incidents", __name__)

@incident_bp.route("", methods=["POST"])
@jwt_required()
def create_incident():
    identity = get_jwt_identity()
    user = User.query.get(identity["id"])

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Ensure all required incident fields are present
    required_fields = ["type", "title", "description", "latitude", "longitude"]
    for field in required_fields:
        if not request.form.get(field):
            return jsonify({"error": f"'{field}' is required"}), 400

    # Check media presence
    if "file" not in request.files:
        return jsonify({"error": "Media file is required"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Create Incident
    incident = Incident(
        type=request.form["type"],
        title=request.form["title"],
        description=request.form["description"],
        latitude=float(request.form["latitude"]),
        longitude=float(request.form["longitude"]),
        is_critical=request.form.get("is_critical", "false").lower() == "true",
        user_id=user.id
    )

    db.session.add(incident)
    db.session.flush()  # needed to access incident.id before full commit

    # Upload to Cloudinary
    upload_result = upload_file(file)
    if not upload_result:
        db.session.rollback()
        return jsonify({"error": "Failed to upload file to Cloudinary"}), 500

    media_type = upload_result["resource_type"]

    media = Media(
        media_type=media_type,
        url=upload_result["secure_url"],
        public_id=upload_result["public_id"],
        user_id=user.id,
        incident_id=incident.id
    )

    db.session.add(media)
    db.session.commit()

    return jsonify({
        "message": "Incident reported successfully",
        "incident": {
            "id": incident.id,
            "type": incident.type,
            "title": incident.title,
            "description": incident.description,
            "latitude": incident.latitude,
            "longitude": incident.longitude,
            "is_critical": incident.is_critical,
            "status": incident.status,
            "user_id": incident.user_id,
            "created_at": incident.created_at.isoformat()
        },
        "media": media.to_dict()
    }), 201
