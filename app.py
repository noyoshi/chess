#!/usr/bin/env python3
from __future__ import print_function
import json
import sys

from flask import Flask, render_template, request, send_file 

app = Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/img/<file_name>', methods=['GET'])
def img(file_name):
    """The images for the chess pieces"""
    return send_file('static/chessboard/img/chesspieces/wikipedia/{}'.format(file_name))

@app.route('/board_state', methods=['POST'])
def board_state():
    start   = str(request.form['source'])
    end     = str(request.form['target'])
    piece   = str(request.form['piece'])
    team    = str(request.form['orientation'])
    eprint("START: {} END: {} PIECE: {} TEAM: {}".format(start, end, piece, team))
    return "success"

def eprint(*args, **kwargs):
    print("[LOG]", *args, file=sys.stderr, **kwargs)
