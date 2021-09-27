import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const FormationDialog = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [speed, setSpeed] = useState(1000);

    useImperativeHandle(ref, () => ({
        handleClickOpen() {
            setOpen(true);
        }
    }));


    const handleClose = () => {
        setOpen(false);
    };

    const createFormation = () => {
        props.audioRef.current.dropPoint(name, speed);
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Formation</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Unique Formation Name"
                    fullWidth
                    value={name}
                    onChange={e => setName(e.target.value)}
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="speed"
                    label="Transition Speed (ms)"
                    fullWidth
                    label="Number"
                    value={speed}
                    onChange={e => setSpeed(e.target.value)}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={createFormation}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}
)

export default FormationDialog;
