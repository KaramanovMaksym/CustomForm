import React from 'react'
import Steps from './Steps'
import StepBasic from './StepBasic'
import StepContacts from './StepContacts'
import StepAvatar from './StepAvatar'
import StepFinish from './StepFinish'
import ButtonsNextPrev from './ButtonsNextPrev'

export default class App extends React.Component {
  constructor() {
    super()
    
    this.state = {
      currentForm: 1,
      listForms: ['Basic', 'Contacts', 'Avatar', 'Finish'],
      
      saveData: {
        firstname: 'Maksym',
        lastname: 'Karamanov',
        password: '123456',
        repeatPassword: '123456',
        gender: 'male',
        email: '',
        mobile: '',
        country: '1',
        city: '',
        avatar: ''
      },
      
      success: {
        Basic: true,
        Contacts: false,
        Avatar: false,
        Finish: false
      },

      errors: {
        firstname: null,
        lastname: null,
        password: null,
        repeatPassword: null,
        gender: null,
        email: null,
        phone: null,
        city: null,
        avatar: null
      }
    }
  }

  onSubmitNext = event => {
    event.preventDefault()
    const CURRENT_FORM = this.state.currentForm
    const errors = this.checkIsValidAll()

    if (this.checkIsErrors(errors)) {
      this.setState({ errors })
    } else {
      let success = { ...this.state.success }
      success[this.state.listForms[CURRENT_FORM]] = true
      this.changeCurrentForm(this.state.listForms[CURRENT_FORM])
      this.setState({ errors, success })
      this.changePhase(true)
    }
  }

  onSubmitPrevius = event => {
    event.preventDefault()
    const CURRENT_FORM = this.state.currentForm
    const success = { ...this.state.success }

    success[this.state.listForms[CURRENT_FORM-1]] = false
    this.changeCurrentForm(this.state.listForms[CURRENT_FORM-1])
    this.setState({ success })
    this.changePhase(false)
  }

  onSubmitReset = event => {
    event.preventDefault()
    this.setState(
      {
        currentForm: 1,
        listForms: ['Basic', 'Contacts', 'Avatar', 'Finish'],
        saveData: {
          firstname: 'Maksym',
          lastname: 'Karamanov',
          password: '123456',
          repeatPassword: '123456',
          gender: 'male',
          email: '',
          mobile: '',
          country: '1',
          city: '',
          avatar: ''
        },
        success: {
          Basic: true,
          Contacts: false,
          Avatar: false,
          Finish: false
        },
        errors: {
          firstname: null,
          lastname: null,
          password: null,
          repeatPassword: null,
          gender: null,
          email: null,
          phone: null,
          city: null,
          avatar: null
        }
      }
    ) 
  }

  onChange = event => {
    const saveData = { ...this.state.saveData }

    if ((event.target.name === 'country')) {
      saveData.city = ''
    }
    saveData[event.target.name] = event.target.value
    this.setState({ saveData })
  }

  onChangeAvatar = event => {
    const reader = new FileReader()
    const saveData = { ...this.state.saveData }
    reader.onload = event => {
      saveData.avatar = event.target.result
      this.setState({ saveData })
    }
    reader.readAsDataURL(event.target.files[0])
  }

  render() {
    console.log('render')
    return (
      <div className='form-container card'>
        <form className='form card-body'>
          <Steps
            listForms={this.state.listForms}
            currentForm={this.state.currentForm}
          />
          {
            (this.state.currentForm === 1) && 
              <StepBasic
                stateGlobal={this.state}
                onChange={this.onChange}
              /> 
          }
          {
            (this.state.currentForm === 2) &&
              <StepContacts
                stateGlobal={this.state}
                onChange={this.onChange}
              />
          }
          {
            (this.state.currentForm === 3) &&
              <StepAvatar
                stateGlobal={this.state}
                onChangeAvatar={this.onChangeAvatar}
              />
          }
          {
            (this.state.currentForm === 4) &&
              <StepFinish
                stateGlobal={this.state}
              />
          }
          <ButtonsNextPrev
            currentForm={this.state.currentForm}
            onSubmitNext={this.onSubmitNext}
            onSubmitPrevius={this.onSubmitPrevius}
            onSubmitReset={this.onSubmitReset}
          />
        </form>
      </div>
    )
  }

  textFieldValidation = name => {
    // debugger
    switch (name) {
      case 'firstname':
      case 'lastname':
        return 'Must be 5 characters or more'
      case 'password':
        return 'Must be 6 characters or more'
      case 'repeatPassword':
        return 'Must be equal password'
      case 'email':
        return 'Invalid email address'
      case 'mobile':
        return 'Invalid mobile'
      default:
        return 'Required'
    }
  }

  conditiondFieldValidation = (name, saveData) => {
    // debugger
    let errorText = null
    switch (this.state.currentForm) {
      case 1:
        switch (name) {
          case 'firstname':
          case 'lastname':
            (saveData[name].length < 5) 
            && (errorText = this.textFieldValidation(name))
            break
          case 'password':
            (saveData[name].length < 6) 
            && (errorText = this.textFieldValidation(name))
            break
          case 'repeatPassword':
            (saveData[name] !== saveData.password) 
            && (errorText = this.textFieldValidation(name))
            break
          default:
            break
        }
        break

      case 2:
        switch (name) {
          case 'email':{
            const reg = /[a-z]+?@\w+?\.(ua)|(com)|(ru)|(gov)/
            !(reg.test(this.state.saveData.email))
            && (errorText = this.textFieldValidation(name))
            break
          }
          case 'mobile':{
            const reg = /^\d{10}$/
            !(reg.test(this.state.saveData.mobile)) 
            && (errorText = this.textFieldValidation(name))
            break
          }
          case 'city':
            !(this.state.saveData.city !== '0' && this.state.saveData.city !== '') 
            && (errorText = this.textFieldValidation(name))
            break
          default:
            break
        }
        break
        
      case 3:
        switch (name) {
          case 'avatar':
            (this.state.saveData.avatar === '')
            && (errorText = this.textFieldValidation(name))
            break
          default:
            break
        }
        break
      default:
        break
    }

    return errorText
  }

  checkIsErrors = errors => {
    // debugger
    for (let key in errors) {
      if (errors[key] !== null) {
        return true
      }
    }
    return false
  }

  checkIsValidAll = () => {
    const saveData = this.state.saveData
    const errors = {}
    for (let name in saveData) {
      errors[name] = this.conditiondFieldValidation(name, saveData)
    }

    return errors
  }

  changeCurrentForm = nameNextForm => {
    // debugger
    this.setState({
      currentForm: nameNextForm
    })
  }

  changePhase = isNext => {
    let nextForm = this.state.currentForm
    if (isNext){
      nextForm++
    } else {
      nextForm--
    }
    this.setState({currentForm: nextForm})
  }
}