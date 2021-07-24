import React, { useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import * as firebase from 'firebase';
import axios from 'axios';

const StyledButton = styled(Button)`
    width: 100px;
    margin: 10px;
`;

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCP7f-0gM04PNKyg_61zNHrEcoGuv5csww",
    authDomain: "choreox.firebaseapp.com",
    databaseURL: "https://choreox.firebaseio.com",
    projectId: "choreox",
    storageBucket: "choreox.appspot.com",
    messagingSenderId: "282857958796",
    appId: "1:282857958796:web:a4823f4d0f62548ee9baa9",
    measurementId: "G-G85QRHSBW3"
  });
}

function SpreadsheetScreen(props) {
  function createSpreadsheet() {
    var user = firebase.auth().currentUser
    var uid = user.uid
    axios.get(`http://localhost:5000/create_spreadsheet/` + uid)
      .then(res => {
        var spreadsheetId = res
        console.log(spreadsheetId)
        // push this spreadsheetid to firebase
      })
      .catch(err => {
        console.log(err)
      })
  }

  function logout() {
    const { history } = props;
    firebase.auth().signOut().then(function() {
      history.push('./login');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  }

  function updateSpreadsheet() {
    var user = firebase.auth().currentUser
    // replace with the spreadsheet of the current team
    var uid = user.uid
    var spreadsheetId = "1XHPP2RcDzI5V_8W3XHRudsopSoeMfyjUGMdVWGKbO2s"
    // get the JSON file from firebase, but for now, manual override
    // Structure is team -> song -> formation -> locations
    var team = {
      songA: {
        formation1: {
          A: {
            x: 2,
            y: 3,
          },
          B: {
            x: 2,
            y: 1,
          }
        },
        formation2: {
          A: {
            x: 3,
            y: 3,
          },
          B: {
            x: 2,
            y: 1,
          }
        }
      },
      songB: {
        formation1: {
          A: {
            x: 2,
            y: 3,
          },
          B: {
            x: 2,
            y: 1,
          }
        },
        formation2: {
          A: {
            x: 3,
            y: 3,
          },
          B: {
            x: 2,
            y: 1,
          }
        }
      }
    }

    var dancers = ["A", "B"]
    var request = {
      "userid" : uid, 
      "spreadsheetid" : spreadsheetId,
      "formation" : team,
      "dancers" : dancers,
    }
    // axios.get(`http://localhost:5000/export/` + user.uid + `/` + spreadsheetId)
    //       .then(res => {
    //         console.log(res.status)
    //       })
    //       .catch(err => {
    //       	console.log(err)
    //       })
    console.log('sending');
    axios.post(`http://localhost:5000/export2`, request)
      .then(res => {
        console.log(request)
        console.log(res)
        console.log(res.status)
      })
      .catch(err => {
        console.log(request)
        console.log(err)
      })
  }

  return (
    <div>
      <StyledButton variant="contained" color="secondary" onClick={() => createSpreadsheet()} >
        Create Spreadsheet
        </StyledButton>
      <StyledButton variant="contained" color="secondary" onClick={() => updateSpreadsheet()}>
        Update Spreadsheet
        </StyledButton>

      <StyledButton variant="contained" color="secondary" onClick={() => logout()}>
        Log Out
        </StyledButton>
    </div>
  );
}


export default SpreadsheetScreen;