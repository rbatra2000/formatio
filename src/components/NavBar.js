import React, { useCallback, useRef, forwardRef } from 'react';
import TempDrawer from '../components/Drawer';
import { Button, Toolbar, AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import * as dom from 'react-router-dom';
import { MusicNote, GroupWork, Today } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    icon: {
        // fontSize: 45,
        // height: '5vh',
        color: 'white'
    },
    label: {
        // Aligns the content of the button vertically.
        flexDirection: 'column',
        color: 'white',
      },
});

const NavBar = forwardRef((props, ref) => {
    const childRef = useRef();
    const classes = useStyles();

    return (
        <div>
            <TempDrawer ref={childRef} />
            <AppBar position="static">
                <Toolbar>

                    <Button onClick={() => childRef.current.toggle()}>
                        <MenuIcon className={classes.icon}/>
                    </Button>
                    <h1>formatio</h1>
                    <div style={{
                        marginLeft: "auto",
                        // marginRight: "auto"
                        // marginRight: -12,
                    }}>
                        <Button classes={{ label: classes.label }}>

                            <MusicNote className={classes.icon} />
                            organizer
                        </Button>
                        <Button classes={{ label: classes.label }}>
                            <GroupWork className={classes.icon} />
                            formations
                        </Button>
                        <Button classes={{ label: classes.label }}>
                            <Today className={classes.icon} />
                            calendar
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
});

export default NavBar;