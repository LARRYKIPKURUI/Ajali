from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.models import User, Media, Incident
from services.cloudinary_service import upload_file

media_bp = Blueprint('media', __name__)

@media_bp.route("", methods=["POST"])
@jwt_required()
def upload_media():
    identity = get_jwt_identity()
    user = User.query.get(identity["id"]) 

    if not user:
        return jsonify({"error": "User not found"}), 404

    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    #  attach to an incident
    incident_id = request.form.get("incident_id")
    incident = None
    if incident_id:
        incident = Incident.query.get(incident_id)
        if not incident:
            return jsonify({"error": "Incident not found"}), 404

    # Upload to Cloudinary
    upload_result = upload_file(file)
    if not upload_result:
        return jsonify({"error": "Cloudinary upload failed"}), 500

    media_type = upload_result['resource_type']  # "image", "video", etc.

    # Save to DB
    media = Media(
    url=upload_result["secure_url"],
    public_id=upload_result["public_id"],
    media_type=media_type,
    user_id=user.id,
    incident_id=incident.id if incident else None
                )
    
    db.session.add(media)
    db.session.commit()

    return jsonify({
        "message": "Media uploaded successfully",
        "media": media.to_dict()
    }), 201
