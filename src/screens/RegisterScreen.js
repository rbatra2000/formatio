import React, { useCallback, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import * as dom from 'react-router-dom';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from "../constants/firebase";
import axios from 'axios';
import {dbh} from "../constants/firebase";

// const express = require('express')
// const {spawn} = require('child_process')

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Formatio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {

  const classes = useStyles();
  const { history } = props;

  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { firstName, lastName, email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);

        var user = firebase.auth().currentUser;

        dbh.collection("users").doc(user.uid).set({
          userEmail: user.email,
          firstName: firstName.value,
          lastName: lastName.value,
          teams: []
        });

        let userid = user.uid

        axios.get(`http://127.0.0.1:5000/register/userid=` + userid)
          .then(res => {
            console.log(res.data)
          })



        // user.updateProfile({
        //   displayName: name,
        // }).then(function () {
        //   // Update successful.
        //   // This is for any database updates
        //   const dbh = firebase.firestore();
        //   dbh.collection("users").doc(user.uid).set({
        //     avatar: 1,
        //   });
        //   // Any UI updates
        //   setLog("SUCCESS!1!")
        // }).catch(function (error) {
        //   // An error happened. Rip hope for the best
        //   setLog(error);
        // });

        history.push("/home");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <dom.Link to="/login" variant="body2">
                {"Already have an account? Sign in"}
              </dom.Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

  //@Maya, main function for authenticating user
  // const authenticate = (email, fName, lName, password, confirm) => {
  //   if (confirm != password) {
  //     setLog("Passwords do not match!");
  //   } else {
  //     let errorMsg = "";
  //     const name = fName + ' ' + lName;
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(() => {
  //         // @Maya, here is where you do whatever you want after authenticating the user

  //         // This is for updating the user profile
  //         var user = firebase.auth().currentUser;

  //         // @ritik change this userid variable
  //         let userid = user.uid

  //         axios.get(`http://127.0.0.1:5000/register/userid=` + userid)
  //         .then(res => {
  //           console.log(res.data)
  //         })

  //         user.updateProfile({
  //           displayName: name,
  //         }).then(function () {
  //           // Update successful.
  //           // This is for any database updates
  //           const dbh = firebase.firestore();
  //           dbh.collection("users").doc(user.uid).set({
  //             avatar: 1,
  //           });
  //           // Any UI updates
  //           setLog("SUCCESS!1!")
  //         }).catch(function (error) {
  //           // An error happened. Rip hope for the best
  //           setLog(error);
  //         });

  //         // run();

  //       })
  //       .catch(error => {
  //         console.log(error.code);
  //         if (error.code == 'auth/email-already-in-use') {
  //           errorMsg = 'That email address is already in use!';
  //         }
  //         else if (error.code == 'auth/invalid-email') {
  //           errorMsg = 'That email address is invalid!';
  //         }
  //         else if (error.code == 'auth/weak-password') {
  //           errorMsg = 'Password must be 6 characters long!';
  //         } else {
  //           errorMsg = 'Something went wrong, please try again!';
  //         }
  //         // Error Catching
  //         setLog(errorMsg);

  //       });
  //   }
  // }

  // // Submit form
  // function submitForm(e) {
  //   e.preventDefault();

  //   // Get values
  //   var firstName = getInputVal('firstName');
  //   var lastName = getInputVal('lastName');
  //   var email = getInputVal('email');
  //   var password = getInputVal('password');
  //   var confirmPassword = getInputVal('confirmPassword');

  //   // Save message
  //   authenticate(email, firstName, lastName, password, confirmPassword);
  // }

  // // Function to get get form values
  // function getInputVal(id) {
  //   return document.getElementById(id).value;
  // }

