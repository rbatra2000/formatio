import React, { useRef, useState, useEffect, useContext } from 'react';
import DragDrop from '../components/DragDrop';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import AudioPlayer from '../components/AudioPlayer';
import { Context } from '../constants/global';
import { dbh } from "../constants/firebase";

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

    const [play, setPlay] = useState("Play");
    const [bpm, setBpm] = useState(0);
    const [loading, setLoading] = useState(true);

    const FORMATIONS = "formations"

    async function helper(teamid, song, formName) {
        var savedForms = {}
        const path = teamid + "/" + song + "/" + formName;
        const forms = await dbh.collection(path).get();
        forms.forEach(formation => {
            savedForms[formation.id] = formation.data();
        })
        return savedForms;
    }

    async function test() {
        var result = {}
        try {
            const snapshot = await dbh.collection("KUJ43").get();
            snapshot.forEach(song => {
                // console.log(doc.id, '=>', doc.data());
                result[song.id] = song.data();
                result[song.id][FORMATIONS] = {};
                if (song.id != "config") {
                    result[song.id]["order"].forEach(formName => {
                        console.log(formName)
                        helper("KUJ43", song.id, formName).then(form => {result[song.id][FORMATIONS][formName] = form; console.log(form);})
                    })
                }
            });
        } catch (error) {
            alert(error)
        }
        return result;
    }

    test().then(result => {
        dispatch({ type: 'UPDATE_DB', data: result["WAP"] });
        setLoading(false);
    })

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <DragDrop ref={dragRef}/>
            <ButtonContainer>
                {bpm}
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
                <StyledButton variant="contained" color="secondary" onClick={() => {
                    audioRef.current.dropPoint();
                }}>New</StyledButton>
                {/* <StyledButton variant="contained" color="secondary" onClick={() => {
                    audioRef.current.dropPoint();
                }}>Drop</StyledButton> */}
            </ButtonContainer>
            <div style={{ textAlign: 'center', margin: '10px', height: '450px' }}>
                <AudioPlayer ref={audioRef} />
            </div>

        </div>
    )
}

export default FormationsScreen;
