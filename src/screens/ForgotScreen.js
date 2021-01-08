import React, { useCallback, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as styles from '../constants/styling.js'
import Container from '@material-ui/core/Container';
import * as dom from 'react-router-dom';
import firebase from "../constants/firebase";
import Link from '@material-ui/core/Link';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // TODO: Fix weird purple color
  // focused: {
  //   "& $notchedOutline": {
  //     borderColor: "styles.PRIMARY"
  //   }
  // },
  // notchedOutline: {},
}));

export default function Forgot(props) {
  const classes = useStyles();
  const { history } = props;

  useEffect(() => {
    // TODO: Hacky but needed
    if (firebase.auth().currentUser) {
      history.push("/");
    }
  });

  const handleReset = useCallback(
    async event => {
      event.preventDefault();
      const { email } = event.target.elements;
      try {
        await firebase
          .auth()
          .sendPasswordResetEmail(email.value);
        alert("Reset Email Sent!")
        history.push("/login");
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
          Forgot Password
        </Typography>
        <form className={classes.form} onSubmit={handleReset}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="styles.PRIMARY" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Reset Email
          </Button>
          <dom.Link to="/login">
            Go Back
              </dom.Link>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}