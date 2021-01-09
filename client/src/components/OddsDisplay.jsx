import React, { useState } from 'react';

const OddsDisplay = ({ odds }) => {


  return (
    <div>
      <div className="odds header">Equity</div>
      {odds.map((individualOdds, i) => {
        return (
          <div className="odds">
            <div>{`Player ${i + 1}:  `}</div>
            <div>
              <div>{` Win ${(individualOdds[0] * 100).toFixed(2)}%`}</div>
              {` Tie ${(individualOdds[1] * 100).toFixed(2)}%`}
            </div>
          </div>
        )
      })}
    </div >
  );
}

export default OddsDisplay;