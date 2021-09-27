import React, { useState, useEffect, useContext, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import DragBall from './DragBall'
import { R_INC, C_INC, GRIDR_INC, GRIDC_INC } from '../constants/shared';
import { Grid, Cell } from "styled-css-grid";
import { Context } from '../constants/global';
import styled from 'styled-components';

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
            } else {
                dispatch({ type: 'NEXT_FORMATION', });
            }
        },

        prevFormation() {
            if (state.formNum === 0) {
                dispatch({ type: 'SET_FORMATION', num: data["order"].length - 1 });
            } else {
                dispatch({ type: 'PREV_FORMATION' });
            }
        }
    }));

    useEffect(() => {
        var formName = data["order"][state.formNum];
        const speed = parseInt(data["speeds"][state.formNum]);
        var formation = data[FORMATIONS][formName];
        for (var key in refs) {
            refs[key].move(formation[key].x, formation[key].y, speed);
            refs[key].changeColor(formation[key].color);
        }
    }, [state.formNum]);

    function changeLocation(form, dancer, x, y) {
        var list = data;
        var formName = data["order"][form];
        list[FORMATIONS][formName][dancer].x = x;
        list[FORMATIONS][formName][dancer].y = y;
        setData(list);
    }

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
            elements.push(<DragBall handler={changeLocation} x={val.x * GRIDC_INC} y={val.y * GRIDR_INC}
                name={key} color={val.color} key={key} ref={(ref) => refs[key] = ref} />)
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