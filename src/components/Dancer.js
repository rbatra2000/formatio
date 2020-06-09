import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../styling/Dancer.css';


function Dancer(props) {
    const [xDel, setDelX] = useState(props.x);
    const [yDel, setDelY] = useState(props.y);



    const handleDrag = (e, ui) => {
        setDelX(xDel + ui.deltaX);
        setDelY(yDel + ui.deltaY);
    };

    return (
        <Draggable
            handle=".handle"
            defaultPosition={{ x: xDel, y: yDel }} // change starting position
            position={null} // don't edit or you can't move them
            grid={[1, 1]} // grid
            scale={1}
            onDrag={handleDrag}>
            <div className="handle ball">
                <div className="ballText">
                    x:{xDel} y:{yDel}
                </div>
            </div>
        </Draggable>);
}

export default Dancer;