from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from config import Config
from extensions import db, migrate, jwt

# Load environment variables
load_dotenv()

# Import blueprints
from routes.auth import auth_bp
from routes.incident_route import incident_bp
from routes.update_profile import update_profile_bp
from routes.get_profile import get_profile_bp
from routes.upload_routes import upload_bp
from utils.test_notification_utils import test_email_bp, test_sms_bp




def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(incident_bp, url_prefix="/api/incidents")
    app.register_blueprint(update_profile_bp, url_prefix="/api/users")
    app.register_blueprint(get_profile_bp, url_prefix="/api/users")
    app.register_blueprint(upload_bp, url_prefix="/api")
    app.register_blueprint(test_email_bp)  # no prefix
    app.register_blueprint(test_sms_bp)    # no prefix

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)