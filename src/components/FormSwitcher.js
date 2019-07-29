import React from 'react'
import StepBasic from './StepBasic'
import StepContacts from './StepContacts'
import StepAvatar from './StepAvatar'
import StepFinish from './StepFinish'

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
      <StepBasic
        stateGlobal={stateGlobal}
        onChange={onChange}
      />
    )
  } else if (stateGlobal.currentForm === 'Contacts') {
    return (
      <StepContacts
        stateGlobal={stateGlobal}
        onChange={onChange}
        getOptionsItem={getOptionsItem}
        takeListCities={takeListCities}
      />
    )
  } else if (stateGlobal.currentForm === 'Avatar') {
    return (
      <StepAvatar
        stateGlobal={stateGlobal}
        onChangeAvatar={onChangeAvatar}
      />
    )
  } else if (stateGlobal.currentForm === 'Finish') {
    return (
      <StepFinish
        stateGlobal={stateGlobal}
      />
    )
  }
}

export default FormSwitcher
