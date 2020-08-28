from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from flask import Flask, url_for, Response, request, jsonify, make_response, json
from formation import updateSheet, makeSheet
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

print("hello")
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


# @app.route('/export/<userid>/<spreadsheetid>')
# def export(userid, spreadsheetid):

#     data, error = updateSheet(userid, spreadsheetid)
#     resp = Response(data, status=error)
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     return resp

@app.route('/export2', methods=["POST"])
def export2():
    content = request.get_json()
    userid = content.get("userid")
    spreadsheetid = content.get("spreadsheetid")
    formation = content.get("formation")
    # userid = request.form['userid']
    # spreadsheetid = request.form['spreadsheetid']
    # formation = request.form['formation']
    data, error = updateSheet(str(userid), spreadsheetid,formation)
    # if data == "Success":
    #     data = "https://docs.google.com/spreadsheets/d/" + spreadsheetid + "/edit#gid=0"
    
    # resp = Response(data, status=error)
    return json_response("success")

# Test receiving post request + need to process json
@app.route('/test')
def result():
    return request.form

def json_response(payload, status=200):
 return (json.dumps(payload), status, {'content-type': 'application/json'})

if __name__ == '__main__':
    app.run()