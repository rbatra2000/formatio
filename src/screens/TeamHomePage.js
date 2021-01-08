import React, { useCallback, useEffect } from 'react';
import TempDrawer from '../components/Drawer';
import { Button, Container, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import * as dom from 'react-router-dom';
import { MusicNote, GroupWork, Today } from '@material-ui/icons';
import NavBar from '../components/NavBar';

export default function DashboardScreen(props) {
    const { history, location } = props;

    if (!location.details) {
        console.log("CHECK");
        history.push("/");
        return null;
    }

    return (
        <div>
            <NavBar />
            <Container maxWidth="lg" style={{ height: '95vh' }}>
                <Grid
                    container
                    align="center"
                    justify="center"
                    alignItems="center"
                    direction="column"
                    style={{ height: '80vh' }}
                >
                    <h1>{location.details.name}</h1>
                    <h2>ID: {location.details.teamId}</h2>

                    <h3>Welcome to your Team homepage! Select the organizer tab to get started!</h3>

                </Grid>
            </Container>
        </div>
    );
};
