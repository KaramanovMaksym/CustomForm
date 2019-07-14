import React from 'react'
import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'
import Form4 from './Form4'

const FormSwitcher = props => {
  const {
    stateGlobal,
    onChange,
    onChangeAvatar,
    getOptionsItem,
    takeListCities
  } = props

  if (stateGlobal.currentForm === 'Basic') {
    return (
      <Form1
        stateGlobal={stateGlobal}
        onChange={onChange}
      />
    )
  } else if (stateGlobal.currentForm === 'Contacts') {
    return (
      <Form2
        stateGlobal={stateGlobal}
        onChange={onChange}
        getOptionsItem={getOptionsItem}
        takeListCities={takeListCities}
      />
    )
  } else if (stateGlobal.currentForm === 'Avatar') {
    return (
      <Form3
        stateGlobal={stateGlobal}
        onChangeAvatar={onChangeAvatar}
      />
    )
  } else if (stateGlobal.currentForm === 'Finish') {
    return (
      <Form4
        stateGlobal={stateGlobal}
      />
    )
  }
}

export default FormSwitcher
