from flask import Blueprint, request, jsonify
from services.cloudinary_service import upload_file

upload_bp = Blueprint('upload_bp', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    result = upload_file(file)
    if result:
        return jsonify(result), 200
    return jsonify({"error": "Upload failed"}), 500
