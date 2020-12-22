import React, { useState } from 'react';
import HandInput from '../HandInput/HandInput.jsx';

const HandInputList = ({ playerNum }) => {

  let playerArray = [...new Array(Number(playerNum))]

  return (
    <div>
      {playerArray.map(i => <HandInput key={i} />)}
    </div>
  );
}

export default HandInputList;