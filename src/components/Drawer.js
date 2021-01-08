import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import firebase, { dbh } from "../constants/firebase";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    link: {
        textDecoration: 'none',
        color: '#252525',
    },
});

const TempDrawer = forwardRef((props, ref) => {
    const classes = useStyles();
    const [status, setStatus] = useState(false);
    const [teams, setTeams] = useState([]);
    const [teamIds, setTeamIds] = useState([]);


    useImperativeHandle(ref, () => ({
        toggle() {
            setStatus(!status);
        }
    }));

    const toggleDrawer = () => {
        setStatus(!status);
    };

    useEffect(() => {
        // TODO: Hacky and still doesn't work exactly
        if (!status) {
            updateTeams();
        }
    }, [status]);

    const signout = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            alert(error);
        });
    }


    const updateTeams = () => {
        if (firebase.auth().currentUser) {
            var docRef = dbh.collection("users").doc(firebase.auth().currentUser.uid);
            var ids;
            docRef.get().then(function (doc) {
                ids = doc.data()["teams"];
                setTeamIds(ids);
                var names = [];
                for (var i = 0; i < ids.length; i++) {
                    dbh.collection(ids[i]).doc("config").get().then(function (doc) {
                        names.push(doc.data()["name"]);
                    })
                }
                setTeams(names);
            })
        }
    }

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List>
                {
                    teams.map((text, index) => (
                        <Link
                            to={{
                                pathname: "/team",
                                details: {
                                    name: text,
                                    teamId: teamIds[index]
                                }
                            }}
                            key={text}
                            className={classes.link}>
                            <ListItem button>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
            </List>
            <Divider />
            <List>
                <Link
                    to="/login"
                    onClick={() => signout()}
                    className={classes.link}>
                    <ListItem button key={"Logout"}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemText primary={"Logout"} />
                    </ListItem>
                </Link>


            </List>
        </div>
    );

    return (
        <div>
            <Drawer anchor="left" open={status} onClose={toggleDrawer}>
                {list()}
            </Drawer>
        </div>
    );
});

export default TempDrawer;