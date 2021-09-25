from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
from os import path
from flask_login import LoginManager

from flask_migrate import Migrate

db = SQLAlchemy()
DB_NAME = "database.db"

migrate = Migrate()
socket = SocketIO()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hjshjhdjah kjshkjdhjs'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'

    socket.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from .views import views
    from .setting import setting
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(setting, url_prefix='/settings')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User, Token

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return socket, app