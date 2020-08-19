from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from flask import Flask, url_for, Response, request, jsonify
from formation import updateSheet, makeSheet
app = Flask(__name__)

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']


@app.route('/')
def api_root():
    return 'Welcome'

@app.route('/register/userid=<userid>')
def api_register(userid):
    """Shows basic usage of the Sheets API.
    Prints values from a sample spreadsheet.
    """
    token_file = userid + 'token.pickle'
    credentials_file = 'credentials.json'

    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists(token_file):
        with open(token_file, 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                credentials_file, SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open(token_file, 'wb') as token:
            pickle.dump(creds, token)

 
    resp = Response('This is the userid: ' + userid)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/create_spreadsheet/<userid>')
def create_spreadsheet(userid):

    data, error = makeSheet(userid)
    resp = Response(data, status=error)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/export/<userid>/<spreadsheetid>')
def export(userid, spreadsheetid):

    data, error = updateSheet(userid, spreadsheetid)
    resp = Response(data, status=error)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

# Test receiving post request + need to process json
@app.route('/test')
def result():
    return request.form

if __name__ == '__main__':
    app.run()