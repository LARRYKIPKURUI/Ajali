from flask import Flask
from flask_cors import CORS
from cloudinary import config as cloudinary_config
from dotenv import load_dotenv
import os

from config import Config
from models.models import db  
from extensions import migrate, jwt  

# from routes.auth import auth_bp
# from routes.incidents import incidents_bp
# from routes.media import media_bp
# from routes.admin import admin_bp
# from routes.notifications import notifications_bp

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    # Cloudinary config
    cloudinary_config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET"),
        secure=True
    )

    # Registering  blueprints here later after kelmunj sets it up
    # app.register_blueprint(auth_bp)
    # app.register_blueprint(incidents_bp)
    # app.register_blueprint(media_bp)
    # app.register_blueprint(admin_bp)
    # app.register_blueprint(notifications_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
