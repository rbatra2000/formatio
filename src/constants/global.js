import React, { createContext, useReducer } from "react";
import {db, starts} from './testdb';

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
            }
        default:
            return state;
    }
};

const initialState = {
    formNum: 0,
    database: db,
    starts: starts,
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
