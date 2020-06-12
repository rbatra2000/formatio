import React, { useState, useRef } from 'react';
import Dancer from '../components/Dancer';
import '../styling/DnD.css';
import { Grid, Cell } from "styled-css-grid";
import { Button } from '@material-ui/core';


function DragDrop(props) {

  // some node ref error that creates an error in the console

  //   function gridLines() {
  //     var element = document.createElement("Cell");
  //     element.setAttribute('class', 'cell');
  //     var elementAbove = document.getElementsByClassName("container")[0];
  //     console.log(element);
  //     elementAbove.appendChild(element);
  // }

  // gridLines();

  // Adjust number of columns for grid
  const cols = 10
  const [data, setData] = useState([]);
  const refer = useRef(null);

  const addNew = (name) => {
    setData([...data, { "name": name, "x": 100, "y": 0 }]);
  }

  const createGrid = (rows, height) => {
    const grid = []
    const cell = <Cell className="cell" width={1} height={height}></Cell>;
    for (var i = 0; i < rows * cols; i++) {
      grid.push(cell);
    }
    return grid;
  }

  const randString = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  return <div className="container">
    <Button onClick={() => { addNew("ritik") }}>ADD</Button>
    <Button onClick={() => {console.log(refer.current)}}>MOVE</Button>

    {data.map(function (d, idx) {
      return (<Dancer x={d.x} y={d.y} name={d.name} key={randString(5)} ref={refer} />)
    })}
    <Grid id="grid" flow="row dense" columns={cols}>
      {/* Adjust number of rows and height of each cell */}
      {createGrid(3, 4)}
    </Grid>


  </div>;
}


export default DragDrop;