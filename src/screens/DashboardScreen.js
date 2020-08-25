import React, { useCallback, useRef } from 'react';
import TempDrawer from '../components/Drawer';
import { Button } from '@material-ui/core';


export default function DashboardScreen() {
    const childRef = useRef();

    return (
        <div>
        <TempDrawer ref={childRef} />
        <Button onClick={() => childRef.current.toggle()}>Hi</Button>
        </div>
        );
};
