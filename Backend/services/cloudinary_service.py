import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()  

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def upload_file(file, folder="ajali/incidents"):
    try:
        response = cloudinary.uploader.upload(file, folder=folder)
        return {
            "secure_url": response["secure_url"],
            "public_id": response["public_id"],
            "resource_type": response["resource_type"]
        }
    except Exception as e:
        print("Cloudinary Upload Error:", e)
        return None
