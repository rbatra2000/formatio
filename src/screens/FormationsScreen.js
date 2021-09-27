import React, { useRef, useState, useEffect, useContext } from 'react';
import DragDrop from '../components/DragDrop';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import AudioPlayer from '../components/AudioPlayer';
import { Context } from '../constants/global';
import { dbh } from "../constants/firebase";
import FormationDialog from '../components/FormationDialog';

// In future, maybe remove this if not necessary?

const ButtonContainer = styled.div`
  align-items: center;
  text-align:center;
  margin: 10px;
  width: 100%;
  flex: 1;
  column-gap: 20px;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
    width: 100px;
    margin: 10px;
`;

const Loader = styled.div`
    border: 16px solid #ffffff;
    border-top: 16px solid #000000;
    border-radius: 50%;
    margin: auto;
    margin-top: 40vh;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
`;

const FormationsScreen = () => {
    const [state, dispatch] = useContext(Context);
    const dragRef = useRef(null);
    const audioRef = useRef(null);
    const dialogRef = useRef(null);

    const [play, setPlay] = useState("Play");
    const [bpm, setBpm] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    async function getFormationData() {
        var result = {};
        try {
            const snapshot = await dbh.collection("KUJ43").get();
            snapshot.forEach(song => {
                result[song.id] = song.data();
            });
        } catch (error) {
            alert(error)
        }
        return result;
    }

    useEffect(() => {
        getFormationData().then(res => {
            dispatch({ type: 'UPDATE_DB', data: res["WAP"] });
            setData(res["WAP"]);
            setLoading(false);
        })
    }, [])

    return (
        <div>
            {loading ? <Loader /> : <><DragDrop ref={dragRef} formation={data} />
            <FormationDialog ref={dialogRef} audioRef={audioRef}/>
            <ButtonContainer>
                <hr />
                <StyledButton variant="contained" color="secondary" onClick={() => {
                    dragRef.current.prevFormation();
                }}>Previous</StyledButton>
                <StyledButton variant="contained" color="secondary" onClick={() => {
                    dragRef.current.nextFormation();
                }}>Next</StyledButton>
                <StyledButton variant="contained" color="secondary" onClick={() => {
                    if (play === "Play") {
                        setPlay("Pause");
                        audioRef.current.playAudio();
                    } else {
                        setPlay("Play");
                        audioRef.current.pauseAudio();
                    }
                }}>{play}</StyledButton>
                <StyledButton variant="contained" color="secondary" onClick={() => dialogRef.current.handleClickOpen()}>New</StyledButton>
                <StyledButton variant="contained" color="secondary" onClick={() => {
                    dispatch({ type: 'SAVE_DB', data: state.database});
                }}>Save</StyledButton>
            </ButtonContainer>
            <div style={{ textAlign: 'center', margin: '10px', height: '450px' }}>
                <AudioPlayer ref={audioRef} />
            </div></>}

        </div>
    )
}

export default FormationsScreen;
