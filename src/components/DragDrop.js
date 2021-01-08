import React, { useState, useEffect, useContext, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import DragBall from './DragBall'
import { R_INC, C_INC, GRIDR_INC, GRIDC_INC } from '../constants/shared';
import { Grid, Cell } from "styled-css-grid";
import { Context } from '../constants/global';


// NOTE: Pretty much set just need to be able to transition from formation to formation
// Add realtime updates so if one device changes something it changes on the other AND/oR you can see when another user is active (so you don't want to change anything)

// import * as firebase from 'firebase'
// import 'firebase/firestore';

// if (!firebase.apps.length) {
//     firebase.initializeApp({
//         apiKey: "AIzaSyCP7f-0gM04PNKyg_61zNHrEcoGuv5csww",
//         authDomain: "choreox.firebaseapp.com",
//         databaseURL: "https://choreox.firebaseio.com",
//         projectId: "choreox",
//         storageBucket: "choreox.appspot.com",
//         messagingSenderId: "282857958796",
//         appId: "1:282857958796:web:a4823f4d0f62548ee9baa9",
//         measurementId: "G-G85QRHSBW3"
//     });
// }


// const dbh = firebase.firestore();

const createGrid = (height) => {
    const grid = []
    const cell = <Cell width={1} style={{ backgroundColor: 'lightgray', position: 'relative' }}></Cell>;
    for (var i = 0; i < C_INC * R_INC; i++) {
        grid.push(cell);
    }
    return grid;
}

const Formations = forwardRef((props, ref) => {
    const [state, dispatch] = useContext(Context);
    const [data, setData] = useState(state.database);

    useImperativeHandle(ref, () => ({
        nextFormation() {
            if (state.formNum === data.length - 1) {
                dispatch({ type: 'RESET_FORMATION' });
            } else {
                dispatch({ type: 'NEXT_FORMATION', });
            }
        },

        prevFormation() {
            if (state.formNum === 0) {
                dispatch({ type: 'SET_FORMATION', num: data.length - 1 });
            } else {
                dispatch({ type: 'PREV_FORMATION' });
            }
        }
    }));


    const refs = {};

    // const addNew = (name) => {
    //     setData([...data, { "name": name, "x": 0, "y": 0 }]);
    //     dbh.collection("people").doc(name).set({
    //         x: 0,
    //         y: 0,
    //     });
    //     setDialogVisible(false);
    // }

    // function getRandomInt(max) {
    //     return Math.floor(Math.random() * Math.floor(max));
    // }

    // useEffect(() => {
    //     // dbh.collection("people").onSnapshot(querySnapshot => {
    //     //     const list = [];
    //     //     querySnapshot.forEach(doc => {
    //     //         const { x, y } = doc.data();
    //     //         list.push({
    //     //             name: doc.id,
    //     //             x,
    //     //             y,
    //     //         });
    //     //     });
    //     //     const newList = list.map(function (e) {
    //     //         e.x = e.x * GRIDC_INC;
    //     //         e.y = e.y * GRIDR_INC;
    //     //         return e;
    //     //     })
    //     //     setData(newList);

    //     //     if (loading) {
    //     //         setLoading(false);
    //     //     }

    //     // });

    //     /* Need some way to handle window resizes */
    //     // function handleResize() {
    //     //     console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
    //     //     for (var key in refs) {
    //     //         console.log(key);
    //     //     }

    //     // }
    //     // window.addEventListener('resize', handleResize)
    // }, [loading]);

    useEffect(() => {
        for (var key in refs) {
            var dict = data[state.formNum];
            refs[key].move(dict["dancers"][key].x, dict["dancers"][key].y, dict.duration);
            refs[key].changeColor(dict["dancers"][key].color);
        }
    }, [state.formNum]);

    function changeLocation(form, dancer, x, y) {
        var list = data;
        list[form]["dancers"][dancer].x = x;
        list[form]["dancers"][dancer].y = y;
        setData(list);
        // setData([... ])
        // console.log(form);
        // dispatch({ type: 'CHANGE_FORMATION', f: form, d: dancer, xCoor: x, yCoor: y });
    }

    var elements = []
    for (const [k, val] of Object.entries(data[state.formNum]["dancers"])) {
        elements.push(<DragBall handler={changeLocation} x={val.x * GRIDC_INC} y={val.y * GRIDR_INC}
            name={k} color={val.color} key={k} ref={(ref) => refs[k] = ref} />)
    }

    return (
        <View style={styles.mainContainer}>
            {/* Border of the grid*/}
            <View style={styles.grid}>
                <Grid id="grid" flow="row dense" columns={C_INC} style={{ position: 'absolute', width: "100%", height: "100%", }} gap={"3px"}>
                    {/* Adjust number of rows and height of each cell */}
                    {createGrid()}
                </Grid>

                <View>
                    {
                        elements
                    }
                </View>
            </View>
        </View>
    );
});

// Change number of rows and columns later by doing css programatically
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    grid: {
        width: "100%",
        height: "500px",
        borderColor: "black",
        alignItems: "center",
    },

});

export default Formations;