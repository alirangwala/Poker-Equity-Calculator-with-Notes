import React, { useState, useEffect } from 'react';

const SoloCard = ({ clickCard, value, cssClass, label }) => {

  const [active, setActive] = useState(true)

  return (
    <div>
      {active ?
        <li
          onClick={(e, val) => {
            clickCard(e, value); setActive(false)
          }
          }
          className={cssClass} >
          {label}
        </li >
        : <li className="card-back card">🂠</li>}
    </div>
  );
}

export default SoloCard;