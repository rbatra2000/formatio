import React, { useEffect, useState } from "react";
import app from "./firebase";
import styled from 'styled-components';
import '../App.css';


export const AuthContext = React.createContext();

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

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <Loader />
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};