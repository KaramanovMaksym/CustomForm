import React from 'react'
import defaultImage from '../images.png'

const Form3 = props => {
  const { stateGlobal, onChangeAvatar } = props

  return (
    <div className='form-group'>
      <img
        src={stateGlobal.saveData.avatar || defaultImage}
        className='img-fluid'
        alt='Responsive'
      />
      <div className='input-group'>
        <div className='custom-file'>
          <input
            type='file'
            className='custom-file-input error-input'
            id='avatar'
            name='avatar'
            aria-describedby='inputGroupFileAddon04'
            onChange={onChangeAvatar}
          />
          <label className='custom-file-label' htmlFor='avatar'>
            Choose file
          </label>
        </div>
        {stateGlobal.errors.avatar ? (
          <div className='invalid-feedback'>{stateGlobal.errors.avatar}</div>
        ) : null}
      </div>
    </div>
  )
}

export default Form3
