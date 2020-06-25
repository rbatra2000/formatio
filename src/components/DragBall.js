import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated, Easing } from "react-native";
import { GRID_WIDTH, CIRCLE_RADIUS, GRID_HEIGHT, GRIDR_INC, GRIDC_INC } from '../constants/shared';
import { Context } from '../constants/global';

// NOTE: Pretty much set just need to be able to transition from formation to formation
// Need to clean up and convert to pure component
// import * as firebase from 'firebase'
// import 'firebase/firestore';


// //NOTE: Be prepared to protect against empty strings as name
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


class DragBall extends Component {

    constructor(props) {
        super(props);

        this.nextFormation = props.handler;

        this.state = {
            coordinates: "(" + String(this.convert(props.x, "R")) + "," + String(this.convert(props.y, "C")) + ")",
            scale: new Animated.Value(1), // scale
            pan: new Animated.ValueXY({
                x: 0,
                y: 0,
            }), // Location of Circle
            name: props.name,
            color: props.color
        };

        this.state.pan.x = new Animated.Value(props.x);
        this.state.pan.y = new Animated.Value(props.y);
        this.position = { x: props.x, y: props.y }
        this.state.pan.addListener((value) => this.position = value);
        this.coord = {x: props.x, y: props.y};


        // Weird bug where if u "flick" the circle (ur finger never leaves the box) the circle goes flying but the coordinates don't change? not sure how to fix
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderTerminationRequest: () => true,
            // Initially, set the value of x and y to 0 (the center of the screen)
            onPanResponderGrant: (e, gesture) => {
                // Set the initial value to the current state
                this.state.pan.setOffset({
                    x: this.position.x,
                    y: this.position.y
                })
                this.state.pan.setValue({ x: 0, y: 0 });
                this.state.pan.extractOffset();
                Animated.spring(
                    this.state.scale,
                    // CHANGE THE SPECIFIC SCALE SIZE
                    { toValue: 1.5, friction: 3 }
                ).start();
            },

            // When we drag/pan the object, set the delate to the states pan position
            onPanResponderMove: (e, gestureState) => {
                if (this.coord.x < GRID_WIDTH / -2 || this.coord.x > GRID_WIDTH / 2
                    || this.coord.y > GRID_HEIGHT || this.coord.y < 0) {
                    this.coord = {x: parseInt(this.position.x), y: parseInt(this.position.y)};
                } else {
                    this.updateText();
                }

                Animated.event([
                    null, { dx: this.state.pan.x, dy: this.state.pan.y }
                ])(e, gestureState);

            },


            onPanResponderRelease: (e, gesture) => {

                // Flatten the offset to avoid erratic behavior
                this.state.pan.flattenOffset();
                Animated.spring(
                    this.state.scale,
                    { toValue: 1, friction: 4 }
                ).start();
                if (this.coord.x < GRID_WIDTH / -2 || this.coord.x > GRID_WIDTH / 2
                    || this.coord.y > GRID_HEIGHT || this.coord.y < 0) {

                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 4,
                    }).start();
                    this.coord = {x: 0, y: 0};
                    this.setState({
                        coordinates: "(" + String(this.coord.x) + "," + String(this.coord.y) + ")",
                    })

                }


                // Firebase
                // dbh.collection("people").doc(this.state.name).set({
                //     x: this.convertToStageR(this.coordX),
                //     y: this.convertToStageC(this.coordY),
                // });

                this.nextFormation(this.context[0].formNum, this.state.name, this.convert(this.coord.x, "R"), this.convert(this.coord.y, "C"));


            }

        });
        this.updateText = this.updateText.bind(this);
    }

    static contextType = Context;

    // for testing
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    changeColor(hex) {
        this.setState({
            color: hex,
        })
    }

    move(newX, newY, dur) {
        this.coord = {x: newX * GRIDC_INC, y: newY * GRIDR_INC}
        Animated.timing(this.state.pan, {
            toValue: { x: this.coord.x, y: this.coord.y },
            duration: dur,
            easing: Easing.linear,
        }).start();

        this.setState({
            coordinates: "(" + String(newX) + "," + String(newY) + ")",
        });
    }

    convert(num, char) {
        var val = GRIDR_INC;
        if (char === "R") {
            val = GRIDC_INC;
        }
        return (Math.round((num / (val)) / .25) * .25).toFixed(2);
    }

    updateText() {

        this.coord = {x: parseInt(this.position.x), y: parseInt(this.position.y)}

        this.setState({
            coordinates: "(" + String(this.convert(this.coord.x, "R")) + "," + String(this.convert(this.coord.y, "C"))
        })
    }

    render() {
        return (
            <View>
                {this.renderDraggable()}
            </View>
        );
    }

    renderDraggable() {
        // Destructure the value of pan from the state
        let { pan, scale } = this.state;

        // Calculate the x and y transform from the pan value
        let [translateX, translateY] = [pan.x, pan.y];

        let rotate = '0deg';

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        let panStyle = { transform: [{ translateX }, { translateY }, { rotate }, { scale }] };

        return (
            <View style={styles.draggy}>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[panStyle, styles.circle, { backgroundColor: this.state.color }]}
                >
                    <Text style={styles.ballText}>{this.state.coordinates}</Text>
                    <Text>{this.state.name}</Text>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    draggy: {
        alignItems: "center",
        justifyContent: "center",
        cursor: "move",
        userSelect: "none",
    },
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        alignItems: "center",
        justifyContent: 'center',
        zIndex: 10,
        position: "absolute",
    },

    ballText: {
        fontSize: 10,
    }
});

export default DragBall;




// Hooks Attempt:
// const DragBall = (props) => {
//     const handler = props.handler;
//     const [state, setState] = useState({
//         coordinates: "(" + String((Math.round((props.x / (GRIDR_INC)) / .25) * .25).toFixed(2)) + "," + String((Math.round((props.y / (GRIDC_INC)) / .25) * .25).toFixed(2)) + ")",
//         scale: new Animated.Value(1), // scale
//         pan: new Animated.ValueXY({
//             x: props.x,
//             y: props.y,
//         }), // Location of Circle
//         name: props.name,
//         color: props.color
//     });

//     var _val = { x: props.x, y: props.y };
//     state.pan.addListener((value) => _val = value);
//     var coord = { x: props.x, y: props.y };

//     const convert = (x, ch) => {
//         switch (ch) {
//             case "R":
//                 return (Math.round((x / (GRIDR_INC)) / .25) * .25).toFixed(2);
//             default:
//                 return (Math.round((x / (GRIDC_INC)) / .25) * .25).toFixed(2);

//         }
//     };

//     var updateText = () => {
//         coord = { x: parseInt(_val.x), y: parseInt(_val.y) }

//         setState({
//             ...state,
//             coordinates: "(" + String(convert(coord.x, "R")) + "," + String(convert(coord.y, "C"))
//         })
//     }

//     const panResponder = PanResponder.create({
//         onStartShouldSetPanResponder: (e, gesture) => true,
//         onPanResponderTerminationRequest: () => true,
//         // Initially, set the value of x and y to 0 (the center of the screen)
//         onPanResponderGrant: (e, gesture) => {
//             // Set the initial value to the current state
//             state.pan.setOffset({
//                 x: _val.x,
//                 y: _val.y
//             })
//             setState({ ...state, pan: { x: 0, y: 0 } })
//             state.pan.extractOffset();
//             Animated.spring(
//                 state.scale,
//                 // CHANGE THE SPECIFIC SCALE SIZE
//                 { toValue: 1.5, friction: 3 }
//             ).start();
//         },

//         // When we drag/pan the object, set the delate to the states pan position
//         onPanResponderMove: (e, gestureState) => {
//             if (coord.x < GRID_WIDTH / -2 || coord.x > GRID_WIDTH / 2
//                 || coord.y > GRID_HEIGHT || coord.y < 0) {
//                 coord.x = parseInt(_val.x); //+ this.state.num * 60;
//                 coord.y = parseInt(_val.y); // + this.state.num * 60;
//             } else {
//                 updateText();
//             }

//             Animated.event([
//                 null, { dx: state.pan.x, dy: state.pan.y }
//             ])(e, gestureState);

//         },


//         onPanResponderRelease: (e, gesture) => {

//             // Flatten the offset to avoid erratic behavior
//             state.pan.flattenOffset();
//             Animated.spring(
//                 state.scale,
//                 { toValue: 1, friction: 4 }
//             ).start();

//             if (coord.x < GRID_WIDTH / -2 || coord.x > GRID_WIDTH / 2
//                 || coord.y > GRID_HEIGHT || coord.y < 0) {

//                 Animated.spring(state.pan, {
//                     toValue: { x: 0, y: 0 },
//                     friction: 4,
//                 }).start();

//                 coord = { x: 0, y: 0 }
//                 setState({
//                     ...state,
//                     coordinates: "(" + String(coord.x) + "," + String(coord.y) + ")",
//                 })

//             }


//             // Firebase
//             // dbh.collection("people").doc(this.state.name).set({
//             //     x: this.convertToStageR(this.coordX),
//             //     y: this.convertToStageC(this.coordY),
//             // });

//             handler(state.name, convert(coord.x, "R"), convert(coord.y, "C"));
//         }

//     });

//     updateText = updateText.bind(this);

//     // for testing
//     const getRandomInt = (max) => {
//         return Math.floor(Math.random() * Math.floor(max));
//     }

//     const changeColor = (hex) => {
//         setState({
//             ...state,
//             color: hex,
//         })
//     }

//     const move = (newX, newY, dur) => {
//         coord = { x: newX * GRIDC_INC, y: newY * GRIDR_INC }
//         Animated.timing(state.pan, {
//             toValue: { x: coord.x, y: coord.y },
//             duration: dur,
//             easing: Easing.linear,
//         }).start();

//         setState({
//             ...state,
//             coordinates: "(" + String(newX) + "," + String(newY) + ")",
//         });
//     }

//     const renderDraggable = () => {
//         // Destructure the value of pan from the state
//         let { pan, scale } = state;

//         // Calculate the x and y transform from the pan value
//         let [translateX, translateY] = [pan.x, pan.y];

//         let rotate = '0deg';

//         // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
//         let panStyle = { transform: [{ translateX }, { translateY }, { rotate }, { scale }] };

//         return (
//             <View style={styles.draggy}>
//                 <Animated.View
//                     {...panResponder.panHandlers}
//                     style={[panStyle, styles.circle, { backgroundColor: state.color }]}
//                 >
//                     <Text style={styles.ballText}>{state.coordinates}</Text>
//                     <Text>{state.name}</Text>
//                 </Animated.View>
//             </View>
//         );
//     }

//     return (
//         <View>
//             {renderDraggable()}
//         </View>
//     );
// }