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

    return (
        <div>
            <DragDrop ref={dragRef} />
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

                <div style={{ margin: '10px', height: '450px' }}>
                    <AudioPlayer />
                </div>
            </div>

        </div>
    )
}

export default FormationsScreen;
