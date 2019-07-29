import React from 'react'
import countries from '../data/countries'
import cities from '../data/cities'

const StepFinish = props => {
  const { stateGlobal } = props
  // debugger
  return (
    <div className='form-group'>
      <div className='d-flex flex-row h3 mb-3'>
        <img
          src={stateGlobal.saveData.avatar}
          className='img-fluid w-25'
          alt=''
        />
        <div className='ml-5'>
          {stateGlobal.saveData.firstname + ' ' + stateGlobal.saveData.lastname}
        </div>
      </div>

      <div className='mb-3'>
        <strong> Email: </strong> {stateGlobal.saveData.email}
      </div>
      <div className='mb-3'>
        <strong> Mobile: </strong> {stateGlobal.saveData.mobile}
      </div>
      <div className='mb-3'>
        <strong> Location: </strong>{' '}
        {countries[stateGlobal.saveData.country - 1].name +
          ', ' +
          cities[parseInt(stateGlobal.saveData.city)].name}
      </div>
    </div>
  )
}

export default StepFinish
