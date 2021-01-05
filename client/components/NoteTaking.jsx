import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput.jsx';
import axios from 'axios'

const NoteTaking = ({ holdings, board, odds }) => {

  const { register, handleSubmit, errors } = useForm({
  })

  const onSubmit = data => {
    axios.post('/notes/add', data)
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
          value={holdings}
          register={register({ required: true })}
        />
        {errors.game && errors.game.type === 'required' && (<p>This is required</p>)}
        <FormInput
          label='Board'
          id='board'
          type='text'
          name='board'
          value={board}
          register={register({ required: true })}
        />
        {errors.game && errors.game.type === 'required' && (<p>This is required</p>)}
        <FormInput
          label='Odds'
          id='blinds'
          type='odds'
          name='odds'
          value={odds}
          register={register({ required: true })}
        />
        {errors.game && errors.game.type === 'required' && (<p>This is required</p>)}
        <FormInput
          label='Stack'
          id='stack'
          type='text'
          name='stack'
          register={register}
        />
        <FormInput
          label='Position'
          id='position'
          type='text'
          name='position'
          register={register}
        />
        {errors.position && errors.position.type === 'required' && (<p>This is required</p>)}
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
          label='Win/Lose'
          id='win'
          type='text'
          name='win'
          register={register}
        />
        <FormInput
          label='Additional Notes'
          id='addNotes'
          type='text'
          name='addNotes'
          register={register}
        />
      </div>
      <input
        type='submit'
      // onClick={(e) => { e.preventDefault; setNotes({ 'yo': 'yo' }) }}
      />
    </form>
  );
}

export default NoteTaking;