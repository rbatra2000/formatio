import React, { useCallback, useRef } from 'react';
import TempDrawer from '../components/Drawer';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';


export default function CreateTeamScreen() {
    const childRef = useRef();

    return (
        <div>
            <TempDrawer ref={childRef} />
            <Button onClick={() => childRef.current.toggle()}>
                <MenuIcon style={{ fontSize: 45, height: '5vh' }} />
            </Button>
            <Container maxWidth="lg" style={{ height: '95vh' }}>
                <Grid container
                    align="center"
                    spacing={3}>
                    <Grid item xs={12}>
                        <h1>Formatio</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Create Team</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <FavoriteIcon style={{ fontSize: 45 }} />
                    </Grid>

                    <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Auto-Generated ID"
                                name="email"
                                autoComplete="email"
                                variant="filled"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                variant="filled"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                variant="filled"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            variant="filled"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                             </Button>


                </Grid>
            </Container>
        </div>
    );
};
