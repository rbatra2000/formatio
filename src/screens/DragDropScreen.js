import React from 'react';
import Dancer from '../components/Dancer';
import '../styling/DnD.css';
import { Grid, Cell } from "styled-css-grid";


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

const height = 4;

  return <div className="container">
    <Grid id="grid" flow="row dense" columns={8}>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>

      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>

      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>

      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>
      <Cell className="cell" width={1} height={height}></Cell>

    </Grid>
    <Dancer x="0" y="0" name="Ritik" />
    <Dancer x="300" y="100" name="Maya" />
    <Dancer x="600" y="100" name="Rohit" />

  </div>;
}

export default DragDrop;