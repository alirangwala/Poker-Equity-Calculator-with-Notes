import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput.jsx';
import axios from 'axios'

const UpdateNote = ({ setModalIsOpen, note }) => {

  const { register, handleSubmit, errors } = useForm({})

  const onSubmit = data => {
    axios.put(`/notes/add/${note._id}`, data)
      .then(res => console.log(data))
      .catch(res => console.log(JSON.stringify(data)))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput
          label='Game'
          id='game'
          type='text'
          name='game'
          placeholder={note.game}
          register={register({ required: true, minLength: 5 })}
        />
        {errors.game && errors.game.type === 'required' && (<p>This is required</p>)}
        {errors.game && errors.game.type === 'minLength' && (<p>MinLength of 5</p>)}
        <FormInput
          label='Blinds'
          id='blinds'
          type='text'
          name='blinds'
          register={register({ required: true })}
        />
        {errors.game && errors.game.type === 'required' && (<p>This is required</p>)}
        <FormInput
          label='Holdings'
          id='holdings'
          type='text'
          name='holdings'
          register={register({ required: true })}
        />
        {errors.game && errors.game.type === 'required' && (<p>This is required</p>)}
        <FormInput
          label='Board'
          id='board'
          type='text'
          name='board'
          register={register}
        />
        {errors.game && errors.game.type === 'required' && (<p>This is required</p>)}
        <FormInput
          label='Odds'
          id='blinds'
          type='odds'
          name='odds'
          register={register}
        />
        {errors.game && errors.game.type === 'required' && (<p>This is required</p>)}
        <FormInput
          label='Stack'
          id='stack'
          type='text'
          name='stack'
          register={register}
        />
        <label htmlFor={'position'} >Position </label>
        <br />
        <select name='position' ref={register}>
          <option value='Button'>Button</option>
          <option value='Small Blind'>Small Blind</option>
          <option value='Big Blind'>Big Blind</option>
          <option value='UTG'>UTG</option>
          <option value='UTG +1'>UTG +1</option>
          <option value='UTG +2'>UTG +2</option>
          <option value='LJ'>LJ</option>
          <option value='HJ'>HJ</option>
          <option value='CO'>CO</option>
        </select>
        <FormInput
          label='Preflop Action'
          id='preflopAction'
          type='text'
          name='preflopAction'
          register={register}
        />
        <FormInput
          label='Flop Action'
          id='flopAction'
          type='text'
          name='flopAction'
          register={register}
        />
        <FormInput
          label='Turn Action'
          id='turnAction'
          type='text'
          name='turnAction'
          register={register}
        />
        <FormInput
          label='River Action'
          id='riverAction'
          type='text'
          name='riverAction'
          register={register}
        />
        <FormInput
          label='Additional Notes'
          id='addNotes'
          type='text'
          name='addNotes'
          className='text-box'
          register={register}
        />
        <FormInput
          label='Win/Lose'
          id='win'
          type='checkbox'
          value='true'
          name='win'
          register={register}
        />
      </div>
      <input
        type='submit'
      />
      <button onClick={(e) => { e.stopPropagation(); setModalIsOpen(false); }}> X </button>
    </form>


  );
}

export default UpdateNote;