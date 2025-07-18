from extensions import db
from models.models import User
from app import create_app

app = create_app()

with app.app_context():
    # Check if test user already exists
    existing_user = User.query.filter_by(email="testuser@example.com").first()
    if existing_user:
        print(" Test user already exists.")
    else:
        user = User(
            username="testuser",
            email="testuser@example.com",
            phone_number="0711222333",
            emergency_contact_name="Test Mum",
            emergency_contact_phone="0711000000",
            is_admin=False,
            is_verified=True
        )
        user.set_password("testpass123")
        db.session.add(user)
        db.session.commit()
        print(" Test user seeded successfully.")
