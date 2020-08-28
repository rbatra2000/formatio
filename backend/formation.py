import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from flask import Flask, url_for
from collections import namedtuple

Dancer = namedtuple("Dancer", "name x y")
Formation = namedtuple("Formation", "dancers")
Song = namedtuple("Song", "name num_rows num_cols formations")

FORMATION_A = Formation(dancers=[Dancer(name="a", x=0, y=0),
                                 Dancer(name="b", x=1, y=1),
                                 Dancer(name="c", x=2, y=2),
                                ])

FORMATION_B = Formation(dancers=[Dancer(name="e", x=0, y=0),
                                 Dancer(name="f", x=1, y=1),
                                 Dancer(name="g", x=2, y=2),
                                ])

FORMATION_C = Formation(dancers=[Dancer(name="x", x=0, y=0),
                                 Dancer(name="y", x=1, y=1),
                                 Dancer(name="z", x=2, y=2),
                                ])

FORMATION_D = Formation(dancers=[Dancer(name="x", x=0, y=0),
                                 Dancer(name="y", x=1, y=1),
                                 Dancer(name="z", x=2, y=2),
                                ])

SONG_A = Song(name="song_a", num_rows=8, num_cols=8, formations=[FORMATION_A, FORMATION_B])
SONG_B = Song(name="song_b", num_rows=8, num_cols=8, formations=[FORMATION_A, FORMATION_B])
SONG_C = Song(name="song_c", num_rows=8, num_cols=8, formations=[FORMATION_A, FORMATION_B, FORMATION_C, FORMATION_D])

def deleteSheet(sheetService, sheetId, spreadsheetId):
    batch_update_spreadsheet_request_body = {
    # A list of updates to apply to the spreadsheet.
    # Requests will be applied in the order they are specified.
    # If any request is not valid, no requests will be applied.
    'requests': [{'deleteSheet': {'sheetId': sheetId}}]  # TODO: Update placeholder value.

    # TODO: Add desired entries to the request body.
    }

    request = sheetService.batchUpdate(spreadsheetId=spreadsheetId, body=batch_update_spreadsheet_request_body)
    response = request.execute()

def addSheet(sheetService, spreadsheetId, name):
    properties = {"title": name}
    batch_update_spreadsheet_request_body = {
    # A list of updates to apply to the spreadsheet.
    # Requests will be applied in the order they are specified.
    # If any request is not valid, no requests will be applied.
    'requests': [{'addSheet': {'properties': properties}}]  # TODO: Update placeholder value.

    # TODO: Add desired entries to the request body.
    }

    request = sheetService.batchUpdate(spreadsheetId=spreadsheetId, body=batch_update_spreadsheet_request_body)
    response = request.execute()

    reply = response.get("replies")

    addSheetResponse = reply[0].get("addSheet")
    prop = addSheetResponse.get("properties")
    id = prop.get("sheetId")
    formatSheet(sheetService, spreadsheetId, id)



def formatSheet(sheetService, spreadsheetId, song_sheet_id):
    batch_update_spreadsheet_request_body = {
        'requests': [
                    {
                      "updateDimensionProperties": {
                        "range": {
                          "sheetId": song_sheet_id,
                          "dimension": "COLUMNS",
                          "startIndex": 0,
                          "endIndex": 25
                        },
                        "properties": {
                          "pixelSize": 30
                        },
                        "fields": "pixelSize"
                      }
                    },
                    {
                      "updateDimensionProperties": {
                        "range": {
                          "sheetId": song_sheet_id,
                          "dimension": "ROWS",
                          "startIndex": 0,
                          "endIndex": 25
                        },
                        "properties": {
                          "pixelSize": 20
                        },
                        "fields": "pixelSize"
                      }
                    }
                  ]
    }
    request = sheetService.batchUpdate(spreadsheetId=spreadsheetId, body=batch_update_spreadsheet_request_body)
    response = request.execute()


def clearWorksheet(sheetService, spreadsheetId):
    ranges = []
    include_grid_data = False
    sheet = sheetService.get(spreadsheetId=spreadsheetId, ranges=ranges, includeGridData=include_grid_data).execute()
    for sheet in sheet.get("sheets"):
        prop = sheet.get("properties")
        index = prop.get('index')
        if (index == 0): 
            continue


        id = prop.get('sheetId')
        deleteSheet(sheetService, id, spreadsheetId)



def addSongs(sheetService, spreadsheetId, songs):
  for song in songs:

       addSheet(sheetService, spreadsheetId, song.name)

       #create values
       values = []
       makeFormations(values, song.formations, song.num_rows, song.num_cols)
       body = {
        'values': values
       }
       value_input_option = 'RAW'

       range_value = song.name + '!A1:Z' + str(len(values))
       result = sheetService.values().update(spreadsheetId=spreadsheetId, range=range_value,
                                 valueInputOption=value_input_option, body=body).execute()


def makeFormations(values, formations, num_rows, num_cols):

  #create empty array of strings
  for n in range(len(formations)):

    # //push a number row for heading
    numbers = []
    numbers.append(" ")
    for m in range(1, num_cols+1):
      numbers.append(str(m))
    
    values.append(numbers)

    # //append empty array for dancers to be filled in
    for i in range(1, num_rows+1):
      row = []
      row.append(str(i))
      for j in range(num_cols):
        row.append(" ")
      values.append(row)

    # //append empty row into the structure for spacing
    empty_row = []
    for j in range(num_cols):
        empty_row.append(" ")
    
    values.append(empty_row)
  


  # // now fill the strings
  for i in range(len(formations)):
    addFormation(values, formations[i], i*(num_rows+2))


def addFormation(values, formation, offset):
    # //adding dancers
  for dancer in formation.dancers:
      values[dancer.x + offset + 1][dancer.y + 1] = dancer.name


def songStructure(formation_overall):

  song_list = []

  for song_name in formation_overall.keys():
    song = formation_overall[song_name]
    formation_list = []
    for formation_name in song.keys():
      formation = song[formation_name]
      dancer_list = []
      for dancer_name in formation.keys():
        dancer = formation[dancer_name]
        dancer_structure = Dancer(name=dancer_name, x=dancer["x"], y=dancer["y"])
        dancer_list.append(dancer_structure)
      formation_structure = Formation(dancers=dancer_list)
      formation_list.append(formation_structure)
    song_structure = Song(name=song_name, num_rows=8, num_cols=8, formations=formation_list)
    song_list.append(song_structure)
        

  return song_list


def getSheetService(userid):
    token_file = userid + 'token.pickle'
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists(token_file):
        with open(token_file, 'rb') as token:
            creds = pickle.load(token)

    # If there are no (valid) credentials available, do nothing
    if not creds or not creds.valid:
        return "No credentials"
        

    service = build('sheets', 'v4', credentials=creds)

    return service.spreadsheets()

def updateSheet(userid, spreadsheetId, formation):
    #get the sheet serice
    sheetService = getSheetService(userid)
    if (type(sheetService) is str):
        return sheetService, 401

    clearWorksheet(sheetService, spreadsheetId)
    print(formation)

    songs = songStructure(formation)
    addSongs(sheetService, spreadsheetId, songs)
    return "Success", 200

def makeSheet(userid):
    #get the sheet serice
    sheetService = getSheetService(userid)
    if (type(sheetService) is str):
        return sheetService, 401

    spreadsheet_body = {
    }
    request = sheetService.create(body=spreadsheet_body)
    response = request.execute()
    
    spreadsheetId = response.get("spreadsheetId")
    # @Ritik push this spreadsheetId ^ with the userid 

    return spreadsheetId, 200