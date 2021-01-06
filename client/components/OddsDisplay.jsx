import React, { useState } from 'react';

const OddsDisplay = ({ odds }) => {


  return (
    <div>
      {console.log("ODDS", odds)}
      <div className="odds header">Equity</div>
      {odds.map((individualOdd, i) => {
        return (
          <div className="odds">
            {`Player ${i + 1}: ${(individualOdd * 100).toFixed(2)}%`}
          </div>
        )
      })}
    </div>
  );
}

export default OddsDisplay;