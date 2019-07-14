import React from 'react'

const TextField = props => {
  const {
    id,
    name,
    type,
    placeholder,
    labelText,
    value,
    onChange,
    error
  } = props

  return (
    <div className='form-group'>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        labeltext={labelText}
        onChange={onChange}
        error={error}
        className='form-control'
      />
    
      {
        error ? (
          <div className='invalid-feedback'>{error}</div>
        ) : null
      }
    </div>
  )
}

export default TextField