import React, { useRef, useState } from 'react';
import DragDrop from '../components/DragDrop';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import Sound from 'react-sound';
import soundfile from '../assets/audio.mp3';

const ButtonContainer = styled.div`
  align-items: center;
  text-align:center;
  margin: 10px;
`;

const StyledButton = styled(Button)`
  width: 100px;
  &:hover {
    background-color: #5469d4;
  }
`;

const FormationsScreen = () => {
    const dragRef = useRef(null);
    const [bpm, setBpm] = useState(0);
    const [songPosition, setPosition] = useState(0);
    const [play, setPlay] = useState(Sound.status.PLAYING);

    const playButton = () => {
        if (play === Sound.status.PLAYING) {
            return 'Pause';
        }
        return 'Play';
    }

    return (
        <div>
            <DragDrop ref={dragRef} />
            <Sound
                url={soundfile}
                playStatus={play}
                autoLoad={true}
                loop={true}
                onPlaying={({ position }) => setPosition(position)}
                playFromPosition={songPosition}
            />
            <ButtonContainer>
                {bpm}
                <hr />
                <StyledButton style={{ marginRight: "10px" }} variant="contained" color="secondary" onClick={() => {
                    dragRef.current.prevFormation();
                }}>Previous</StyledButton>
                <StyledButton variant="contained" color="secondary" onClick={() => {
                    dragRef.current.nextFormation();
                }}>Next</StyledButton>
            </ButtonContainer>
            <div style={{ textAlign: 'center', }}>
                <Button variant="contained" color="primary" onClick={() => {
                    if (play === Sound.status.PLAYING) {
                        setPlay(Sound.status.PAUSED);
                    } else {
                        setPlay(Sound.status.PLAYING);
                    }
                }}>{playButton()}</Button>
            </div>
        </div>
    )
}

export default FormationsScreen;
