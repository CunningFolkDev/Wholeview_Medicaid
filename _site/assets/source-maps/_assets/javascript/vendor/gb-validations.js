// gb Validations
// original jQuery version created by Jake McHargue (http://twitter.com/jkmcrg) for gb Studio (grantblakeman.com)
// updated, converted to vanilla js, and maintained by Grant Blakeman
const GBValidations = {
  init: () => {
    return GBValidations.listenForValidations()
  },
  initAjax: () => {
    return GBValidations.listenForValidations()
  },
  listenForValidations: () => {
    const processForm = (formElement) => {
      if (!GBValidations.validate(formElement).check) {
        e.preventDefault()
        return false
      }
    }

    // set listeners on forms we want to validate
    const formElements = document.getElementsByTagName('FORM')
    return Array.prototype.forEach.call(formElements, (el) => {
      if (el.classList.contains('live-validation')) {
        el.addEventListener('submit', processForm)
      }
    })
  },
  validate: (formElement) => {
    let valid = {
      check: true,
      message: null
    }
    const fieldElements = formElement.querySelectorAll('*[data-validates]')
    if (fieldElements) {
      // reset form errors
      const resetFormErrors = (formElement) => {
        formElement.classList.remove('error')

        const buttonElement = formElement.getElementsByTagName('BUTTON')[0]
        if (buttonElement) {
          buttonElement.classList.remove('disabled','error')
          buttonElement.removeAttribute('disabled')
        }
      }
      resetFormErrors(formElement)

      // validate fields
      Array.prototype.forEach.call(fieldElements, (el) => {
        var checkAction, i, len, results, validation, validations
        el.classList.remove('error')
        validations = el.getAttribute('data-validates').split(' ')
        results = []
        for (i = 0, len = validations.length; i < len; i++) {
          validation = validations[i]
          checkAction = GBValidations.validateProperty(validation, el)
          if (!checkAction.check) {
            el.classList.add('error')
            formElement.classList.add('error')
            results.push(valid = {
              check: checkAction.check,
              message: checkAction.message
            })
          } else {
            results.push(void 0)
          }
        }
        return results
      })
    }
    return valid
  },
  validateProperty: (property, fieldElement) => {
    let isEmailFormat, isEmpty, isPhoneValid, isUrlFormat, phoneValue, valid
    const fieldValue = fieldElement.value
    valid = {
      check: true,
      message: null
    }
    if (property === 'presence') {
      if (fieldValue === '') {
        valid = {
          check: false,
          message: 'fill out all the fields'
        }
      }
      return valid
    } else if (property === 'url') {
      isUrlFormat = fieldValue.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
      isEmpty = fieldValue === ''
      if (!isEmpty && !isUrlFormat) {
        valid = {
          check: false,
          message: 'Not a valid URL!'
        }
      }
      return valid
    } else if (property === 'email') {
      isEmailFormat = fieldValue.match(/^([^@\s]+)@(([^@\s]+)+[a-z]{2,})$/)
      isEmpty = fieldValue === ''
      if (!isEmpty && !isEmailFormat) {
        valid = {
          check: false,
          message: 'enter a valid email address'
        }
      }
      return valid
    } else if (property === 'phone') {
      isEmpty = fieldValue === ''
      isPhoneValid = false
      phoneValue = fieldValue.replace(/\D/g, '')
      if (phoneValue.length === 10) {
        isPhoneValid = true
      } else if (phoneValue.length === 11 && (phoneValue.charAt(0) === '1')) {
        isPhoneValid = true
      }
      if (!isEmpty && !isPhoneValid) {
        valid = {
          check: false,
          message: 'enter a valid phone number'
        }
      }
      return valid
    } else {
      console.log(`do not have a validation for ${property}`)
      valid = {
        check: false,
        message: `do not have a validation for ${property}`
      }
      return valid
    }
    return null
  }
}

ready(GBValidations.init)
