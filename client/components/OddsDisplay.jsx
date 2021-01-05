import React, { useState } from 'react';

const OddsDisplay = ({ odds }) => {


  return (
    <div>
      <div className="odds header">Equity</div>
      {odds.map((indiOdd, i) => {
        return (
          <div className="odds">
            {console.log('ODDs', odds)}
            {`Player ${i + 1}: ${(indiOdd * 100).toFixed(2)}%`}
          </div>
        )
      })}
    </div>
  );
}

export default OddsDisplay;