import React, { useState, useEffect, useImperativeHandle, forwardRef, useContext } from 'react'
import Peaks from 'peaks.js';
import sound from "../assets/audio.mp3";
import { Context } from '../constants/global';

// Add some sort of loading for the mp3 file loading!!

const AudioPlayer = forwardRef((props, ref) => {
    const [instance, setInstance] = useState(null);
    const [state, dispatch] = useContext(Context);
    const [loading, setLoading] = useState(true);


    useImperativeHandle(ref, () => ({
        // On mac you can use the play button on keyboard which messes up the state for the button
        playAudio() {
            instance.player.play();
        },

        pauseAudio() {
            instance.player.pause();
        },

        dropPoint() {
            // need to add id to each of these points
            // Add additional functionality to be able to move formations around as well
            instance.points.add({ time: instance.player.getCurrentTime(), labelText: 'Test point', color: 'black' });
            // setPoints([...points, instance.player.getCurrentTime()]);
            dispatch({ type: 'ADD_FORMATION', time: instance.player.getCurrentTime() });
        }
    }));

    // idk about this
    let binarySearch = function (arr, x, start, end) {

        // Base Condition 
        if (end - start <= 1) {
            return start;
        }

        if (x >= arr[end]) {
            return end;
        }

        // Find the middle index 
        let mid = Math.floor((start + end) / 2);

        // // Compare mid with given key x 
        // if (arr[mid]===x) return "exact"; 

        // If element at mid is greater than x, 
        // search in the left half of mid 
        if (arr[mid] > x)
            return binarySearch(arr, x, start, mid);
        else

            // If element at mid is smaller than x, 
            // search in the right half of mid 
            return binarySearch(arr, x, mid, end);
    }

    function timeListener(time) {
        const newForm = binarySearch(state.starts, time, 0, state.starts.length - 1);
        // Ideally I want to only do this when its different from the previous formation
        dispatch({ type: 'SET_FORMATION', num: newForm });
    }

    // the formations aren't showing up at first idk why


    useEffect(() => {
        // Run initially once
        startFunction();
    }, []);

    useEffect(() => {
        // Run after instance is initialized (needs to be once somehow)
        if (instance != null && loading) {
            instance.on('player.timeupdate', timeListener);

            // Modifications
            // const view = instance.views.getView('zoomview');
            // console.log(view);
            // view.enableMarkerEditing(true);

            setLoading(false);
        }
    }, [instance, loading]);

    const startFunction = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        var initialPoints = [];
        for (var i = 0; i < state.starts.length; i++) {
            // Add non-editable point, with a Red color
            initialPoints.push({ time: state.starts[i], labelText: ("Formation #" + i), color: "#FF0000" });
        }


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
            // Precision of time label of play head and point/segment markers
            timeLabelPrecision: 2,

            // Array of initial point objects
            points: initialPoints,
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
            {state.starts.toString()}
            <br /><br />
        </div>
    )
});

export default AudioPlayer;