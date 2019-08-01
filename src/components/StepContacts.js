import React from 'react'
import TextField from './TextField'
import countries from '../data/countries'
import cities from '../data/cities'

const StepFinish = props => {
  const { stateGlobal, onChange } = props

  const takeListCities = cities => {
    let x = [{ id: 0, name: 'Select city' }]
    for (let key in cities) {
      if (cities[key].country === parseInt(stateGlobal.saveData.country)) {
        let obj = { id: key, name: cities[key].name }
        x.push(obj)
      }
    }
    return x
  }
  
  const getOptionsItem = items => {
    return items.map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))
  }

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
          className={stateGlobal.errors.city ? 'form-control border-danger' : 'form-control'}
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

export default StepFinish