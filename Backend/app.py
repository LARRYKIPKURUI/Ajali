from flask import Flask
from config import Config
from models.models import db
from routes.auth import auth_bp  # example route

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp)

    with app.app_context():
        db.create_all()  # creates tables

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
