import React, { useState, useEffect, useContext, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import DragBall from './DragBall'
import { R_INC, C_INC, GRIDR_INC, GRIDC_INC } from '../constants/shared';
import { Grid, Cell } from "styled-css-grid";
import { Context } from '../constants/global';
import styled from 'styled-components';


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

const Formations = forwardRef((props, ref) => {
    const [state, dispatch] = useContext(Context);
    const [data, setData] = useState(props.formation);
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [refs, setRefs] = useState({});
    const FORMATIONS = "formations";
    const refs = {};

    useImperativeHandle(ref, () => ({
        nextFormation() {
            if (state.formNum === data["order"].length - 1) {
                dispatch({ type: 'RESET_FORMATION' });
                // setFormNum(0);
            } else {
                dispatch({ type: 'NEXT_FORMATION', });
                // setFormNum(formNum+1);
            }
        },

        prevFormation() {
            if (state.formNum === 0) {
                dispatch({ type: 'SET_FORMATION', num: data["order"].length - 1 });
                // setFormNum(data["order"].length - 1)
            } else {
                dispatch({ type: 'PREV_FORMATION' });
                // setFormNum(formNum-1);
            }
        }
    }));

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
        var formName = data["order"][state.formNum];
        var formation = data[FORMATIONS][formName];
        console.log(formation);
        console.log(refs);
        for (var key in refs) {
            console.log(key);
            refs[key].move(formation[key][0], formation[key][1], 300);
            // refs[key].changeColor(dict["dancers"][key].color); // TODO add changing colors
        }
    }, [state.formNum]);

    function changeLocation(form, dancer, x, y) {
        var list = data;
        var formName = data["order"][form];
        list[FORMATIONS][formName][dancer][0] = x;
        list[FORMATIONS][formName][dancer][1] = y;
        setData(list);
        // setData([... ])
        // console.log(form);
        // dispatch({ type: 'CHANGE_FORMATION', f: form, d: dancer, xCoor: x, yCoor: y });
    }

    // const formName = data["order"][state.formNum];
    // var
    // if (data[FORMATIONS][formName]) {
    //     for (const [k, val] of Object.entries(data[FORMATIONS][formName])) {
    //         elements.push(<DragBall handler={changeLocation} x={val.x * GRIDC_INC} y={val.y * GRIDR_INC}
    //             name={k} color={"red"} key={k} ref={(ref) => refs[k] = ref} />)
    //     }
    // }

    // useEffect(() => {

    // }, [])
    
    useEffect(() => {
        if (state.database != null && loading) {
            setData(state.database);
            setLoading(false);
        }
    })

    if (loading) {
        return <View></View>
    }


    function getDragBalls() {
        const formName = data["order"][state.formNum];
        const elements = [];
        for (const [key, val] of Object.entries(data[FORMATIONS][formName])) {
            elements.push(<DragBall handler={changeLocation} x={val[0] * GRIDC_INC} y={val[1] * GRIDR_INC}
                name={key} color={"red"} key={key} ref={(ref) => refs[key] = ref} />)
        }
        return elements;
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
                        getDragBalls()
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