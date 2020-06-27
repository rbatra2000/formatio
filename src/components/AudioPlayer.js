import React, { useState, useEffect } from 'react'
import Peaks from 'peaks.js';
import { Button } from '@material-ui/core';
import sound from "../assets/audio.mp3";
import styled from 'styled-components';

// Add some sort of loading for the mp3 file loading!!

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

const AudioPlayer = () => {
    const [play, setPlay] = useState("Play");
    const [instance, setInstance] = useState(null);
    const [points, setPoints] = useState([]);


    useEffect(() => {
        // Run initially once
        helper();
    }, []);
    

    const helper = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        const options = {
            containers: {
                overview: document.getElementById('overview-container'),
                zoomview: document.getElementById('zoomview-container')
            },
            mediaElement: document.querySelector('audio'),
            webAudio: {
                audioContext: audioContext
            },

            // customization
        };

        setInstance(Peaks.init(options, function (err, peaks) {
            if (err) {
                console.error('Failed to initialize Peaks instance: ' + err.message);
                return;
            }
        }));
    }

    return (
        <div>
            <ButtonContainer>
                <StyledButton style={{marginRight: '10px'}} variant="contained" color="primary" onClick={() => {
                    if (play === "Play") {
                        setPlay("Pause");
                        instance.player.play();
                    } else {
                        setPlay("Play");
                        instance.player.pause();
                    }
                }}>{play}</StyledButton>
                <StyledButton variant="contained" color="primary" onClick={() => {
                    instance.points.add({ time: instance.player.getCurrentTime(), labelText: 'Test point', color: '#FF0000' });
                    setPoints([...points, instance.player.getCurrentTime()])
                    
                }}>Drop</StyledButton>
            </ButtonContainer>
            <div id="peaks-container">
                <div id="zoomview-container"></div>
                <div id="overview-container"></div>
            </div>
            <audio>
                <source src={sound} />
            </audio>
            {points.toString()}
            <br/><br/>
        </div>
    )
}

export default AudioPlayer;