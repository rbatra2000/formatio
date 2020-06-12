import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import '../styling/Dancer.css';


function Dancer(props) {
    const [x, setX] = useState(parseFloat(props.x));
    const [y, setY] = useState(parseFloat(props.y));
    const name = props.name;


    const update = (newX, newY) => {
        setX(newX/window.innerWidth);
        setY(newY/window.innerHeight);
      }

    return (
        <Rnd
            position={{ x: x, y: y }}
            size={{width: 50, height: 50}}
            onDrag={(e, d) => { setX(d.x); setY(d.y) }}
            dragGrid={[1,1]}
            enableResizing={false}
            bounds="parent"
            className="ball"
        >
            <div className="ballText">
            x:{x} y:{y}<hr/>{name}
            </div>
        </Rnd>
    );
}

export default Dancer;