import React, { useState, useEffect, useImperativeHandle, forwardRef, useContext } from 'react'
import Peaks from 'peaks.js';
import sound from "../assets/audio.mp3";
import { Context } from '../constants/global';

// Add some sort of loading for the mp3 file loading!!

const AudioPlayer = forwardRef((props, ref) => {
    const [instance, setInstance] = useState(null);
    const [state, dispatch] = useContext(Context);
    const [points, setPoints] = useState(state.starts);

    useImperativeHandle(ref, () => ({
        // On mac you can use the play button on keyboard which messes up the state for the button
        playAudio() {
            instance.player.play();
        },

        pauseAudio() {
            instance.player.pause();
        },

        dropPoint() {
            instance.points.add({ time: instance.player.getCurrentTime(), labelText: 'Test point', color: '#FF0000' });
            setPoints([...points, instance.player.getCurrentTime()]);
        }
    }));

    function timeListener(time) {
        const newTime = parseFloat(time.toFixed(1));
        if (points.includes(newTime)) {
            dispatch({ type: 'SET_FORMATION', num: points.indexOf(newTime) });
        }
    }

    // the formations aren't showing up at first idk why


    useEffect(() => {
        // Run initially once
        startFunction();
    }, []);

    useEffect(() => {
        // Run after instance is initialized (needs to be once somehow)
        if (instance != null) {
            instance.on('player.timeupdate', timeListener);

            for (var i = 0; i < points.length; i++) {
                // Add non-editable point, with a Red color
                instance.points.add({ time: points[i], labelText: ("Formation #" + i), id: i, color: "#FF0000" });
            }
            console.log(instance.points.getPoints());
        }
    }, [instance, points]);

    const startFunction = () => {
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
            <div id="peaks-container">
                <div id="zoomview-container"></div>
                <div id="overview-container"></div>
            </div>
            <audio>
                <source src={sound} />
            </audio>
            {points.toString()}
            <br /><br />
        </div>
    )
});

export default AudioPlayer;