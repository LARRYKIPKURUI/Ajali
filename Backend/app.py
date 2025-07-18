from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from config import Config
from extensions import db, migrate, jwt

# from routes.auth import auth_bp
# from routes.incidents import incidents_bp
from routes.media_route import media_bp
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

    # Register blueprints 
    
    # app.register_blueprint(auth_bp)
    # app.register_blueprint(incidents_bp)
    app.register_blueprint(media_bp, url_prefix="/api")
    # app.register_blueprint(admin_bp)
    # app.register_blueprint(notifications_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
