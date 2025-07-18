from extensions import db
from models.models import User
from app import create_app

app = create_app()

with app.app_context():
    # Check if this specific test user already exists
    existing_user = User.query.filter_by(email="ayim@example.com").first()

    if existing_user:
        print("Test user 'ayim' already exists.")
    else:
        user = User(
            username="ayimtester",
            email="ayim@example.com",
            phone_number="0700000000",
            emergency_contact_name="Mama Ayim",
            emergency_contact_phone="0700001111",
            is_admin=False,
            is_verified=True
        )
        user.set_password("ayimsecure123")
        db.session.add(user)
        db.session.commit()
        print("Test user 'ayim' seeded successfully.")
