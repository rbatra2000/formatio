import React, { useCallback, useEffect } from 'react';

import { Button, Container, Grid, Box } from '@material-ui/core';



export default function LandingScreen(props) {


    return (
        <div>
            <Container maxWidth = "sm" maxHeight = "sm">
                <Grid container justify = "center" spacing={3}>
                    <Grid item xs={12} justifyContent="center">
                        <h1>Formatio</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <Button>Login</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button>Signup</Button>
                    </Grid>
                    
                    
                </Grid>
            </Container>

        </div>
    );
};