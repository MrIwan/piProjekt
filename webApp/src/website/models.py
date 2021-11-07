
from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from hashlib import md5


class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(15), unique=True)
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    tokens = db.relationship('Token')
    
    def avatar(self, size = 128):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(digest, size)