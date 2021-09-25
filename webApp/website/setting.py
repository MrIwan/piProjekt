
from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, Token
from . import db
from sqlalchemy.sql import func

import json
import secrets
import string



setting = Blueprint('setting', __name__)



@setting.route('/', methods=['GET', 'POST'])
@login_required
def settings():
    return render_template("settings.html", user=current_user)

@setting.route('/chprofiel', methods=['POST'])
@login_required
def settings_chprofiel():
    
    email = request.form.get('email')
    first_name = request.form.get('firstName')

    current_user_id = current_user.get_id()
    user = User.query.filter_by(id=current_user_id).first()

    if not user.email == email:
        user.email = email
        db.session.commit()
        flash('Email Changed', category='success')

    if not user.first_name == first_name:
        user.first_name = first_name
        db.session.commit()
        flash('Name Changed', category='success')

    elif user.first_name == first_name and user.email == email:
        flash('Nothing to do', category='success')
            
    return render_template("settings.html", user=current_user)

@setting.route('/chpwd', methods=['POST'])
@login_required
def settings_chpwd():
    password_cur = request.form.get('password_cur')
    password1 = request.form.get('password1')
    password2 = request.form.get('password2')

    current_user_id = current_user.get_id()
    user = User.query.filter_by(id=current_user_id).first()

    if not check_password_hash(user.password, password_cur):
        flash('Wrong Password', category='error')
    elif password1 != password2:
        flash('Passwords don\'t match.', category='error')
    elif len(password1) < 7:
        flash('Password must be at least 7 characters.', category='error')
    elif check_password_hash(user.password, password1):
        flash('You used the same Password as before', category='error')
    else:
        user.password = generate_password_hash(password1, method='sha256')
        db.session.commit()
        flash('Password changed', category='success')


    return render_template("settings.html", user=current_user)

@setting.route('/token', methods=['GET','POST'])
@login_required
def settings_token():

    tokens = Token.query.filter_by(user_id=current_user.id).all()
    token = ''

    if len(tokens) >= 3:
        flash('You can only generate three tokens', category='error')
    else:
        alphabet = string.ascii_letters + string.digits
        token = ''.join(secrets.choice(alphabet) for i in range(15))

        new_token = Token(token=token, user_id=current_user.id)
        db.session.add(new_token)
        db.session.commit()


    return render_template("settings.html", user=current_user)

@setting.route('/delete-token', methods=['POST'])
@login_required
def settings_delete_token():
    token = json.loads(request.data)
    tokenId = token['tokenId']
    token = Token.query.get(tokenId)
    if token:
        if token.user_id == current_user.id:
            db.session.delete(token)
            db.session.commit()
    
    return jsonify({})

    