import React, { useState } from 'react';

const HandInput = ({ holdings, setHoldings, index }) => {

  const [tempHoldings, setTempHoldings] = useState('')

  //setTempHoldings(oldArray => [...oldArray, e.target.value])

  const onChange = (e) => {
    e.preventDefault;
    // setTempHoldings(holdings[`player${index}`] = e.target.value)
    setHoldings([...holdings, tempHoldings])
  }


  return (
    <form>
      <label>
        <input type='text' value={tempHoldings} onChange={(e) => onChange(e)} />
      </label>
    </form>
  );
}

export default HandInput;