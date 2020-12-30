import React, { useState } from 'react';

const OddsDisplay = ({ odds }) => {


  return (
    <div>
      {odds &&
        odds.map((indiOdd, i) => {
          return (
            <div>
              {console.log('ODDs', odds)}
              {`player ${i + 1}: ${indiOdd}`}
            </div>
          )
        })}
    </div>
  );
}

export default OddsDisplay;