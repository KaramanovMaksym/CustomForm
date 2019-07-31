import React from 'react'

const ButtonsNextPrev = props => {
  const {currentForm, onSubmitNext, onSubmitPrevius, onSubmitReset} = props

  if (currentForm !== 4  ) {
    return (
      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-light mr-3'
          disabled={!(currentForm !== 1)}
          onClick={onSubmitPrevius}
        >
          Previous
        </button>

        <button
          type='button'
          className='btn btn-secondary'
          onClick={onSubmitNext}
        >
          Next
        </button>
      </div>
    )
  } else {
    return (
      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={onSubmitReset}
        >
          Reset
        </button>
      </div>
    )
  }

}

export default ButtonsNextPrev