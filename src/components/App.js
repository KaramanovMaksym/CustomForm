import React from 'react'
import FormSwitcher from './FormSwitcher'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentForm: 'Basic',
      listForms: ['Basic', 'Contacts', 'Avatar', 'Finish'],

      saveData: {
        firstname: 'Maksym',
        lastname: 'Karamanov',
        password: '123456',
        repeatPassword: '123456',
        gender: 'male',
        email: 'maximanbw@gmail.com',
        mobile: '0967818126',
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
    const errors = { ...this.state.errors }

    this.checkIsValidAll(this.state.saveData, errors)

    if (this.checkIsError(errors)) {
      this.setState({ errors })
    } else {
      let success = { ...this.state.success }
      this.goNextPreviusForm(success, true)
      this.setState({ errors })
      this.setState({ success })
      this.changePhase(true)
    }
  }

  onSubmitPrevius = event => {
    event.preventDefault()
    const success = { ...this.state.success }
    this.goNextPreviusForm(success, false)
    this.setState({ success })
    this.changePhase(false)
  }

  onSubmitReset = event => {
    event.preventDefault()
    const saveData = { ...this.state.saveData }
    const errors = { ...this.state.errors }
    const success = { ...this.state.success }
    
    
    const resetNavigationClass = document.getElementsByClassName('phase')
    for (let i = 0; i < resetNavigationClass.length; i++) {
      if (i === 0 || i === resetNavigationClass.length - 1) {
        resetNavigationClass[i].classList.remove('finished')
        resetNavigationClass[i].classList.toggle('now')
      } else {
        resetNavigationClass[i].classList.remove('finished')
      }
    }

    this.resetState(saveData, errors, success)
    
  }

  onChange = event => {
    // debugger
    if ((event.target.type !== 'radio')) {
      this.setBorderDefault(event.target.name)
    }
    const saveData = { ...this.state.saveData }
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
          <div className='show-phases mb-5'>
            <div className='phase now'>
              <div>1</div>
              <div>{this.state.listForms[0]}</div>
            </div>
            <div className='phase'>
              <div>2</div>
              <div>{this.state.listForms[1]}</div>
            </div>
            <div className='phase'>
              <div>3</div>
              <div>{this.state.listForms[2]}</div>
            </div>
            <div className='phase'>
              <div>4</div>
              <div>{this.state.listForms[3]}</div>
            </div>
          </div>

          <FormSwitcher
            stateGlobal={this.state}
            onChange={this.onChange}
            getOptionsItem={this.getOptionsItem}
            takeListCities={this.takeListCities}
            onChangeAvatar={this.onChangeAvatar}
          />

          {this.btnSwitcher(this.state.currentForm)}
        </form>
      </div>
    )
  }

  getOptionsItem = items => {
    // debugger
    return items.map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))
  }
  
  takeListCities = cities => {
    let x = [{ id: 0, name: 'Select city' }]

    for (let key in cities) {
      if (cities[key].country === parseInt(this.state.saveData.country)) {
        let obj = { id: key, name: cities[key].name }
        x.push(obj)
      }
    }
    return x
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
    switch (this.state.currentForm) {
      case 'Basic':
        switch (name) {
          case 'firstname':
          case 'lastname':
            return saveData[name].length < 5
          case 'password':
            return saveData[name].length < 6
          case 'repeatPassword':
            return saveData[name] !== saveData.password
          default:
            break
        }
        break

      case 'Contacts':
        switch (name) {
          case 'email': {
            const reg = /[a-z]+?@\w+?\.(ua)|(com)|(ru)|(gov)/
            return !reg.test(this.state.saveData.email)
          }
          case 'mobile': {
            const reg = /^\d{10}$/
            return !reg.test(this.state.saveData.mobile)
          }
          case 'city': {
            // debugger
            return !(
              this.state.saveData.city !== '0' &&
              this.state.saveData.city !== ''
            )
          }
          default:
            break
        }
        break
        
      case 'Avatar':
        switch (name) {
          case 'avatar':
            return this.state.saveData.avatar === ''
          default:
            break
        }
        break
      default:
        break
    }
  }

  goNextPreviusForm = (success, isNext) => {
    // debugger
    let nameNextForm = ''
    if (isNext) {
      for (let i = 0; i < this.state.listForms.length - 1; i++) {
        if (this.state.currentForm === this.state.listForms[i]) {
          nameNextForm = this.state.listForms[i + 1]
          success[nameNextForm] = true
          this.changeCurrentForm(nameNextForm)
          break
        }
      }
    } else {
      for (let i = 0; i < this.state.listForms.length; i++) {
        if (this.state.currentForm === this.state.listForms[i]) {
          nameNextForm = this.state.listForms[i - 1]
          break
        }
      }
      success[this.state.currentForm] = false
      this.changeCurrentForm(nameNextForm)
    }
  }

  checkIsError = errors => {
    // debugger
    for (let key in errors) {
      if (errors[key] !== null) {
        return true
      }
    }
    return false
  }

  checkIsValidAll = (saveData, errors) => {
    // debugger
    for (let name in saveData) {
      if(this.conditiondFieldValidation(name, saveData)){
        (errors[name] = this.textFieldValidation(name))
        this.setBorderRed(name)
      } else {
        (errors[name] = null)
      }
    }
  }

  changeCurrentForm = nameNextForm => {
    // debugger
    this.setState({
      currentForm: nameNextForm
    })
  }

  setBorderRed = idName => {
    document.getElementById(idName).classList.add('border-danger')
  }

  setBorderDefault = idName => {
    document.getElementById(idName).classList.remove('border-danger')
  }

  changePhase = isNext => {
    const x = document.getElementsByClassName('phase')
    if (isNext) {
      for (let i = 0; i < x.length; i++) {
        if (x[i].classList.contains('now')) {
          x[i].classList.toggle('now')
          if (i !== x.length) {
            x[i + 1].classList.add('now')
            x[i].classList.toggle('finished')
          }
          break
        }
      }
    } else {
      for (let i = 0; i < x.length; i++) {
        if (x[i].classList.contains('now')) {
          x[i].classList.toggle('now')
          if (i !== 0) {
            x[i - 1].classList.add('now')
            x[i - 1].classList.toggle('finished')
          }
          break
        }
      }
    }
  }

  btnSwitcher = currentForm => {
    if (currentForm !== this.state.listForms[this.state.listForms.length - 1]) {
      return (
        <div className='d-flex justify-content-center'>
          <button
            type='button'
            className='btn btn-light mr-3'
            disabled={!this.state.success.Contacts}
            onClick={this.onSubmitPrevius}
          >
            Previous
          </button>

          <button
            type='button'
            className='btn btn-secondary'
            onClick={this.onSubmitNext}
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
            onClick={this.onSubmitReset}
          >
            Reset
          </button>
        </div>
      )
    }
  }

  resetState = (saveData, errors, success) => {
    for (let key in saveData) {
      if (key == 'gender') {
        saveData[key] = 'male'
      } else if (key == 'country'){
        saveData[key] = '1'
      } else {
        saveData[key] = ''
      }
    }
    for (let key in errors) {
      errors[key] = null
    }
    for (let key in success) {
      if (key === 'Basic') {
        success[key] = true
      } else {
        success[key] = false
      }
    }

    this.setState({
      currentForm: 'Basic',
      saveData,
      errors,
      success
    })
  }
  
}
