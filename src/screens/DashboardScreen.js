import React, { useCallback, useRef } from 'react';
import TempDrawer from '../components/Drawer';
import { Button, Container, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


export default function DashboardScreen() {
    const childRef = useRef();

    return (
        <div>
            <TempDrawer ref={childRef} />
            <Button onClick={() => childRef.current.toggle()}>
                <MenuIcon style={{ fontSize: 45, height: '5vh' }} />
            </Button>
            <Container maxWidth="lg" style={{ height: '95vh' }}>
                <Grid
                    container
                    align="center"
                    justify="center"
                    alignItems="center"
                    direction="column"
                    style={{height: '80vh'}}
                >
                    <h1>Formatio</h1>
                    <Button variant="contained" color="primary" style={{margin: '10px'}}>
                        CREATE A NEW TEAM
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: '10px'}}>
                        JOIN A TEAM
                    </Button>

                </Grid>
            </Container>
        </div>
    );
};
