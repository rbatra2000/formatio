import React, { useRef, useState } from 'react';
import DragDrop from '../components/DragDrop';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import AudioPlayer from '../components/AudioPlayer'

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

const FormationsScreen = () => {
    const dragRef = useRef(null);
    const audioRef = useRef(null);

    const [play, setPlay] = useState("Play");
    const [bpm, setBpm] = useState(0);

    return (
        <div>
            <DragDrop ref={dragRef} />
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
