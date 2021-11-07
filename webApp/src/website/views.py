from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from flask_socketio import emit, join_room, rooms
from .models import User, Token
from . import db
from . import socket
from .data import Menager

import json, asyncio, functools

views = Blueprint('views', __name__)

stat = {}
menager = Menager()

SERVER_SID = 'nothing'

def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            disconnect()
        else:
            return f(*args, **kwargs)
    return wrapped

async def update_task():
    while True:
        print('emitte')
        emit('stat', menager.get_data(), broadcast=True)
        socket.sleep(2)
socket.start_background_task(update_task)


@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    return render_template("home.html", user=current_user)

@views.route('/user_info', methods=['GET'])
@login_required
def user_info():
    dat = {}
    dat['id'] = current_user.id
    dat['email'] = current_user.email
    dat['first_name'] = current_user.first_name
    dat['avatar'] = current_user.avatar()
    return dat

@socket.on('connect')
def connect():

    print("[CLIENT CONNECTED]:", request.sid)
    
    try:
        current_user_id = current_user.get_id()
        user = User.query.filter_by(id=current_user_id).first()

        dat = {}
        dat['id'] = user.id
        dat['email'] = user.email
        dat['first_name'] = user.first_name
        dat['avatar'] = user.avatar()
        menager.add_user(dat)

        emit('stat', data.get_data(), broadcast=True)
    except:
        print('server connected')

    emit('stat', menager.get_data())
    
@socket.on('disconnect')
def disconn():
    print("[CLIENT DISCONNECTED]:", request.sid)
    if request.sid == SERVER_SID:
        menager.phyServer.status = 'offline'
        emit('stat', menager.get_data(), broadcast=True)
    else:
        try:
            current_user_id = current_user.get_id()
            user = User.query.filter_by(id=current_user_id).first()
            menager.remove_user(user.id)
            emit('stat', menager.get_data(), broadcast=True)
        except:
            print('no user')

    

@socket.on('start')
@authenticated_only
def start():
    menager.start()
    emit('stat', menager.get_data(), broadcast=True)

@socket.on('stop')
@authenticated_only
def stop():
    menager.stop()
    emit('stat', menager.get_data(), broadcast=True)

@socket.on('stat')
@authenticated_only
def status():
    emit('stat', menager.get_data(), broadcast=True)

@socket.on('server_online')
def server_online():
    global SERVER_SID
    SERVER_SID = str(request.sid)

    menager.phyServer.status = 'online'
    emit('stat', menager.get_data(), broadcast=True, include_self=False)

@socket.on('update_status')
def update_status(d):
    menager.set_server_status(d)
    emit('stat', menager.get_data(), broadcast=True)

@socket.on('start_game_server')
@authenticated_only
def start_game_server(id):
    global SERVER_SID
    emit('start_game_server_forward', id, room=SERVER_SID)
    print('hallo aus start_game_server')

@socket.on('stop_game_server')
@authenticated_only
def stop_game_server(id):
    global SERVER_SID
    print('stop game server ', id)
    emit('stop_game_server_forward', id, room=SERVER_SID)

@socket.on('new_chat_message')
@authenticated_only
def new_chat_message(msg):
    print('message was ', msg)
    dat = {}
    message = {}
    message['message'] = msg
    message['author'] = current_user.first_name
    message['author_avatar'] = current_user.avatar()
    dat['message'] = message
    emit('stat', dat, broadcast=True, include_self=True )


    

