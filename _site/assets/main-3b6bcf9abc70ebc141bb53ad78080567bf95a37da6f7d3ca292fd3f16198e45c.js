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

ready(GBValidations.init);
(function scope() {
    const E360 = new Function();

    const DropMenu = {
        init: () => {
            DropMenu.watchMobileTrigger();
            return DropMenu.watchPrimaryLinks();
        },
        watchMobileTrigger: () => {
            const nav_node = document.getElementById('nav');
            const nav_icon = document.getElementById('nav_icon');

            nav_icon.onclick = function click() {
                nav_node.classList.toggle('open');
                nav_icon.classList.toggle('open');
            }
        },
        watchPrimaryLinks: () => {
            const openMenu = (e) => {
                if (e.target.classList.contains('top-level-link') && window.innerWidth > 768) {
                    const navListElement = e.target.closest('.nav-item');

                    // always close anything open
                    DropMenu.closeAllSections(primayLinks);

                    // open the specific set of links, if they exist
                    if (!navListElement.classList.contains('no-secondary')) {
                        const navListClass = navListElement.getAttribute('data-nav-class');
                        navElement.classList.add('expanded');
                        navElement.classList.add(navListClass);
                        DropMenu.openPrimarySection(navListElement);
                    }
                }
            }

            const closeMenu = (e) => {
                if (window.innerWidth > 768) {
                    navElement.setAttribute('class', 'main-nav');
                    DropMenu.closeAllSections(primayLinks);
                }
            }

            const navElement = document.getElementById('nav');
            const primayLinks = navElement.querySelectorAll('.primary')[0];

            primayLinks.addEventListener('mouseover', openMenu, false);
            primayLinks.addEventListener('touchenter', openMenu, false);
            navElement.addEventListener('mouseleave', closeMenu, false);
            navElement.addEventListener('touchleave', closeMenu, false);
        },
        openPrimarySection: (navListElement) => {
            navListElement.classList.add('open');
        },
        closeAllSections: (primayLinks) => {
            // close link sets that might be currently open
            const navListElements = primayLinks.querySelectorAll('.nav-item');
            if (navListElements) {
                Array.prototype.forEach.call(navListElements, (el) => {
                    el.classList.remove('open');
                });
            }
            const nav_node = document.getElementById('nav');
            nav_node.setAttribute('class', 'main-nav');
        }
    };

    window.E360 = E360;
    window.DropMenu = DropMenu;
}());

ready(DropMenu.init);
(function scope() {
    const E360 = new Function();

    const Contact = {
      init: () => {
        Contact.watchButtonSubmission()
        return Contact.watchKeypressSubmission()
      },
      grabFormData: (formElement, dataType) => {
        const formData = new FormData(formElement)
        let returnData =  null

        if (dataType === 'json') {
          const formDataObject = new Object()

          formData.forEach((value, key) => {
            formDataObject[key] = value
          })

          returnData = JSON.stringify(formDataObject)
        } else {
          returnData = new URLSearchParams(formData).toString()
        }

        return returnData
      },
      submitForm: (formElement, formAction) => {
        let contentType, formData, urlToCall
        const errorResult = (response, formAction) => {
          console.log(`${formAction} did not work`)
          return console.log(response)
        }
        const successResult = (response, formAction) => {
          const formElement = document.getElementById(`${formAction.replace('-','_')}_form`)
          const formHolderElement = formElement.closest('.form-holder')
          const messageElements = formHolderElement.querySelectorAll('.message')

          let bodyResponse = null
          if (response.bodyUsed) {
            bodyResponse = response.json()
          } else {
            bodyResponse = response.text()
          }

          if (formElement) {
            formElement.style.display = 'none'
          }

          if (bodyResponse.result !== 'error') {
            resetForm(formElement, formAction)
            return Array.prototype.forEach.call(messageElements, (el) => {
              el.removeAttribute('style')
            })
          } else if (bodyResponse.msg.toLowerCase().indexOf('already subscribed') >= 0) {
            resetForm(formElement, formAction)
            return Array.prototype.forEach.call(messageElements, (el) => {
              el.innerHTML = '<p>Thank you!</p><p>You’re all set!</p>'
              el.removeAttribute('style')
            })
          } else {
            let button_text
            if (formAction === 'contact') {
              button_text = 'Send message'
            } else {
              button_text = 'Submit'
            }

            // show the form, if it was hidden
            formHolderElement.removeAttribute('style')

            // show error message
            const errorMessageElements = formElement.querySelectorAll('.error-message')
            Array.prototype.forEach.call(errorMessageElements, (el) => {
              el.textContent = bodyResponse.msg
              el.removeAttribute('style')
            })

            // reset form in-progress state
            formElement.classList.remove('in-progress')
            const submitButtonElements = formElement.querySelectorAll('.submit')
            Array.prototype.forEach.call(submitButtonElements, (el) => {
              el.textContent = button_text
            })
            return console.log(bodyResponse)
          }

          return null
        }
        const resetForm = (formElement, formAction) => {
          const inputElements = formElement.querySelectorAll('INPUT')
          const textAreaElements = formElement.querySelectorAll('TEXTAREA')
          const submitButtonElements = formElement.querySelectorAll('.submit')

          let button_text
          if (formAction === 'contact') {
            button_text = 'Send message'
          } else {
            button_text = 'Submit'
          }

          formElement.classList.remove('in-progress')
          Array.prototype.forEach.call(submitButtonElements, (el) => {
            el.textContent = button_text
          })
          Array.prototype.forEach.call(inputElements, (el) => {
            el.value = ''
          })
          Array.prototype.forEach.call(textAreaElements, (el) => {
            el.value = ''
            el.removeAttribute('style')
          })

          return null
        }

        if (!formElement.classList.contains('in-progress')) {
          const postData = (url = ``, data = {}) => {
            return fetch(url, {
              method: method,
              mode: 'no-cors',
              headers: {
                'Accept': acceptType,
                'Content-Type': contentType,
              },
              body: data, // body data type must match 'Content-Type' header
            })
            .then(response => response)
          }

          const errorMessageElements = formElement.querySelectorAll('.error-message')
          const submitButtonElements = formElement.querySelectorAll('.submit')

          Array.prototype.forEach.call(errorMessageElements, (el) => {
            el.style.display = 'none'
          })
          formElement.classList.add('in-progress')
          Array.prototype.forEach.call(submitButtonElements, (el) => {
            el.textContent = 'Please wait…'
          })

          if (formAction === 'sign-up') {
            method = 'GET'
            formData = Contact.grabFormData(formElement, 'json')
            urlToCall = `https://wholeview.us18.list-manage.com/subscribe/post-json?u=67197f5bd0a1decb3d98c97cc&id=c67e0a1c54&c=?&EMAIL=${JSON.parse(formData).EMAIL}`
            acceptType = 'application/json'
            contentType = 'application/json; charset=utf-8'
            formData = null
          } else if (formAction === 'contact') {
            method = 'POST'
            formData = Contact.grabFormData(formElement, 'queryString')
            urlToCall = 'https://formcarry.com/s/s1U09JSk80i'
            acceptType = 'application/json'
            contentType = 'application/x-www-form-urlencoded; charset=utf-8'
          }
          return postData(urlToCall, formData)
            .then(response => successResult(response, formAction))
            .catch(error => console.error(error))
        }

        return null
      },
      preSubmitForm: (formElement) => {
        let formAction
        const validation = GBValidations.validate(formElement)
        if (validation.check) {
          if (formElement.id === 'sign_up_form') {
            formAction = 'sign-up'
          } else if (formElement.id === 'modal_sign_up_form') {
            formAction = 'modal-sign-up'
          } else if (formElement.id === 'contact_form') {
            formAction = 'contact'
          }
          return Contact.submitForm(formElement, formAction)
        }
        return null
      },
      watchButtonSubmission: () => {
        return document.addEventListener('click', (e) => {
          if ((e.target.tagName === 'A' || e.target.tagName === 'BUTTON') && e.target.classList.contains('submit')) {
            e.preventDefault()

            const parentFormElement = e.target.closest('form')
            return Contact.preSubmitForm(parentFormElement)
          }
          return null
        }, false)
      },
      watchKeypressSubmission: () => {
        // stop forms from getting submitted naturally
        const contactFormElement = document.getElementById('contact_form')
        const signUpFormElement = document.getElementById('sign_up_form')
        const modalSignUpFormElement = document.getElementById('modal_sign_up_form')

        if (contactFormElement) {
          contactFormElement.addEventListener('submit', (e) => {
            e.preventDefault()
          }, true)
        }

        if (signUpFormElement) {
          signUpFormElement.addEventListener('submit', (e) => {
            e.preventDefault()
          }, true)
        }

        if (modalSignUpFormElement) {
          signUpFormElement.addEventListener('submit', (e) => {
            e.preventDefault()
          }, true)
        }

        return document.addEventListener('keyup', (e) => {
          const activeElement = document.activeElement
          const activeFormElement = activeElement.closest('form')
          const key = e.key || e.keyCode

          if (key === 'Enter' || key === 13) {
            if ((activeElement.tagName !== 'TEXTAREA') &&
              (activeElement.tagName === 'INPUT')) {
              return Contact.preSubmitForm(activeFormElement)
            }
          }
        })
      }
    }

    window.E360 = E360;
    window.Contact = Contact;
}());

ready(Contact.init);
function hideModal() {
  const overlay = document.getElementById("overlay-1")
  overlay.classList.add("hidden")
}

function activateModal() {
  const overlay = document.getElementById("overlay-1")
  const modalCloseButton = document.getElementById("modal-close")
  const modal = document.getElementById("modal-1")

  if (!modal) return;

  // Close the modal when you click on either the X button or outside the modal
  overlay.addEventListener('click', hideModal)
  modalCloseButton.addEventListener('click', hideModal)

  // Prevent modal from closing when you click on the modal itself
  modal.addEventListener('click', function(event) {
    event.stopPropagation();
  })

  // Allow the ESC key to close the modal
  document.addEventListener('keyup', function (e) {
    e = e || window.event;

    // 27 is the ESC key
    if(e.keyCode === 27) hideModal();
  });

}

ready(activateModal);





// ---------------------------------------------- first-load boilerplate stuff below

// fire once DOM is loaded
function ready(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
};
