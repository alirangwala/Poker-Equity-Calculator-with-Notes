import React from 'react';

const FormInput = ({ register, error, label, id, ...inputProps }) => {

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        ref={register}
        {...inputProps}
      />
      { error && <div>{error}</div>}

    </div>
  )
}

export default FormInput;