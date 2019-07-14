import React from 'react'
import TextField from './TextField'
import countries from '../data/countries'
import cities from '../data/cities'

const Form2 = props => {
  const { stateGlobal, onChange, getOptionsItem, takeListCities } = props

  return (
    <div className='form-group ml-1'>
      <TextField
        id='email'
        name='email'
        type='text'
        placeholder='Enter email'
        labelText='Email'
        value={stateGlobal.saveData.email}
        onChange={onChange}
        error={stateGlobal.errors.email}
      />

      <TextField
        id='mobile'
        name='mobile'
        type='text'
        placeholder='Enter mobile'
        labelText='Mobile'
        value={stateGlobal.saveData.mobile}
        onChange={onChange}
        error={stateGlobal.errors.mobile}
      />

      <div className='form-group'>
        <label htmlFor='country'>Country</label>
        <select
          className='form-control'
          id='country'
          name='country'
          value={stateGlobal.saveData.country}
          onChange={onChange}
        >
          {getOptionsItem(countries)}
        </select>
      </div>

      <div className='form-group'>
        <label htmlFor='city'>City</label>
        <select
          className='form-control'
          id='city'
          name='city'
          value={stateGlobal.saveData.city}
          onChange={onChange}
        >
          {getOptionsItem(takeListCities(cities))}
        </select>
        {stateGlobal.errors.city ? (
          <div className='invalid-feedback'>{stateGlobal.errors.city}</div>
        ) : null}
      </div>
    </div>
  )
}

export default Form2
