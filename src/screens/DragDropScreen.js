import React from 'react';
import Dancer from '../components/Dancer';

function DragDrop(props) {

  // some node ref error that creates an error in the console

  return <div>
    <Dancer x="100" y="100"/>
    <Dancer x="300" y="100"/>
  </div>;
}

export default DragDrop;