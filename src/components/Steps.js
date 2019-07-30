import React from 'react'

const Steps = props => {
  const {listForms, currentForm} = props
  const getClass = (index) => {
    if (index === currentForm){
      return 'phase now'
    }
    if (index < currentForm) {
      return 'phase finished'
    } else {
      return 'phase'
    }
  }

  return (
    <div className='show-phases mb-5'>
      {listForms.map((name, index) => {
        return (
          <div className={getClass(index+1)}>
            <div>{index + 1}</div>
            <div>{name}</div>
          </div>
        )
      })}  
    </div>
  )
}

export default Steps