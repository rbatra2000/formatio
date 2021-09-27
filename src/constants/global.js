import React, { createContext, useReducer } from "react";
import { db, starts } from './testdb';
import lodash from 'lodash';
import { dbh } from "../constants/firebase";

const FORMATIONS = "formations";
const ORDER = "order";
const TIMES = "times";
const SPEEDS = "speeds";

async function saveData(data) {
    const res = await dbh.collection('KUJ43').doc('WAP').set(data);
}

const Reducer = (state, action) => {
    switch (action.type) {
        case 'NEXT_FORMATION':
            return {
                ...state,
                formNum: state.formNum + 1,
            };
        case 'PREV_FORMATION':
            return {
                ...state,
                formNum: state.formNum - 1,
            };
        case 'RESET_FORMATION':
            return {
                ...state,
                formNum: 0,
            };
        case 'SET_FORMATION':
            return {
                ...state,
                formNum: action.num,
            };
        case 'ADD_FORMATION':
            var formName = state.database[ORDER][state.formNum];
            state.database[ORDER].splice(state.formNum + 1, 0, action.name);
            state.database[TIMES].splice(state.formNum + 1, 0, action.time);
            state.database[SPEEDS].splice(state.formNum + 1, 0, parseInt(action.speed))
            state.database[FORMATIONS][action.name] = lodash.cloneDeep(state.database[FORMATIONS][formName]);
            return {
                ...state,
                formNum: state.formNum + 1,
            };
        case 'UPDATE_DB':
            return {
                ...state,
                database: action.data
            }
        case 'SAVE_DB':
            saveData(action.data);
            return state;
        default:
            return state;
    }
};

const testStarts = [0, 5];

const initialState = {
    formNum: 0,
    database: {},
    error: null
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;
