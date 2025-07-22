from flask_jwt_extended import jwt_required, get_jwt_identity

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "phone_number": user.phone_number,
        "emergency_contact_name": user.emergency_contact_name,
        "emergency_contact_phone": user.emergency_contact_phone,
        "created_at": user.created_at.isoformat()
    }), 200


@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()
    user.phone_number = data.get("phone_number", user.phone_number)
    user.emergency_contact_name = data.get("emergency_contact_name", user.emergency_contact_name)
    user.emergency_contact_phone = data.get("emergency_contact_phone", user.emergency_contact_phone)

    db.session.commit()
    return jsonify({"msg": "Profile updated successfully"}), 200
