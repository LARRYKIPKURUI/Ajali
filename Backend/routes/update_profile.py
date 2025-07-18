from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.models import User

update_profile_bp = Blueprint("update_profile", __name__)

@update_profile_bp.route("/profile", methods=["PATCH"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()["id"]
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    user.phone_number = data.get("phone_number", user.phone_number)
    user.emergency_contact_name = data.get("emergency_contact_name", user.emergency_contact_name)
    user.emergency_contact_phone = data.get("emergency_contact_phone", user.emergency_contact_phone)

    db.session.commit()

    return jsonify({"message": "Profile updated successfully", "user": user.username}), 200
