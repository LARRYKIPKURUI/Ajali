from extensions import db
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash

#  User Model

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    emergency_contact_name = db.Column(db.String(100))
    emergency_contact_phone = db.Column(db.String(20))
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationships
    incidents = db.relationship('Incident', backref='user', lazy=True)
    alerts_created = db.relationship('Alert', backref='creator', lazy=True)
    media = db.relationship('Media', backref='user', lazy=True)

    # Password methods 
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User id={self.id} username='{self.username}' email='{self.email}'>"


#  Incident Model
class Incident(db.Model, SerializerMixin):
    __tablename__ = 'incidents'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.Float, nullable=False, index=True)
    longitude = db.Column(db.Float, nullable=False, index=True)
    is_critical = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default='submitted')  # resolved, rejected, pending
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    media = db.relationship('Media', backref='incident', lazy=True)

    def __repr__(self):
        return f"<Incident id={self.id} title='{self.title}' status='{self.status}' user_id={self.user_id}>"


#  Media Model 
class Media(db.Model, SerializerMixin):
    __tablename__ = 'media'

    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.String(20), nullable=False)  # Image or Video
    url = db.Column(db.String(255), nullable=False)
    public_id = db.Column(db.String(255), nullable=False)  # Required for Cloudinary delete
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    incident_id = db.Column(db.Integer, db.ForeignKey('incidents.id'), nullable=True)

    def __repr__(self):
        return f"<Media id={self.id} type='{self.media_type}' user_id={self.user_id} url='{self.url}'>"

    def to_dict(self):
        return {
            "id": self.id,
            "media_type": self.media_type,
            "url": self.url,
            "public_id": self.public_id,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id,
            "incident_id": self.incident_id
        }


#  Alert Model 
class Alert(db.Model, SerializerMixin):
    __tablename__ = 'alerts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    region = db.Column(db.String(100), index=True)
    severity = db.Column(db.String(20), default='info')  # info, warning, critical
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"<Alert id={self.id} title='{self.title}' region='{self.region}' severity='{self.severity}'>"
