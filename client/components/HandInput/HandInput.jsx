import React, { useState } from 'react';

const HandInput = () => {

  const [Holdings, setHoldings] = useState([]);

  return (
    <form>
      <label>
        <input type='text' name='Hero' />
      </label>
    </form>
  );
}

export default HandInput;