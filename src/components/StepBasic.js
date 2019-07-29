import React from 'react'
import TextField from './TextField'

const StepBasic = props => {
  const {
    stateGlobal,
    onChange
  } = props 

  return (
    <div className='form-group'>
      <TextField
        id='firstname'
        name='firstname'
        type='text'
        placeholder='Enter firstname'
        labelText='Firstname'
        value={stateGlobal.saveData.firstname}
        onChange={onChange}
        error={stateGlobal.errors.firstname}
      />

      <TextField
        id='lastname'
        name='lastname'
        type='text'
        placeholder='Enter lastname'
        labelText='Lastname'
        value={stateGlobal.saveData.lastname}
        onChange={onChange}
        error={stateGlobal.errors.lastname}
      />

      <TextField
        id='password'
        name='password'
        type='password'
        placeholder='Enter password'
        labelText='Password'
        value={stateGlobal.saveData.password}
        onChange={onChange}
        error={stateGlobal.errors.password}
      />

      <TextField
        id='repeatPassword'
        name='repeatPassword'
        type='password'
        placeholder='Enter repeat password'
        labelText='Repeat Password'
        value={stateGlobal.saveData.repeatPassword}
        onChange={onChange}
        error={stateGlobal.errors.repeatPassword}
      />

      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          name='gender'
          id='male'
          value='male'
          checked={stateGlobal.saveData.gender === 'male'}
          onChange={onChange}
        />
        <label className='form-check-label' htmlFor='male'>
          Male
        </label>
      </div>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          name='gender'
          id='female'
          value='female'
          checked={stateGlobal.saveData.gender === 'female'}
          onChange={onChange}
        />
        <label className='form-check-label' htmlFor='female'>
          Female
        </label>
      </div>
    </div>
  );
}

export default StepBasic