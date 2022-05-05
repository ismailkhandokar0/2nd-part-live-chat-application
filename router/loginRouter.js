//external imports 
const express  = require('express')


//internal imports
const{
    getLogin,
    login,
    logout
} = require('../controller/loginController')

const{
    doLoginValidator,
    doLoginValidationHandler
} = require('../middleware/login/loginValidator')

const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')
const {
    redirectLoggedIn
} =  require('../middleware/common/checkLogin')



const router = require('express').Router()   


//login page 
router.get('/',decorateHtmlResponse('Login'),redirectLoggedIn,getLogin)


// login process 
router.post('/',decorateHtmlResponse('Login'),doLoginValidator,doLoginValidationHandler,login)

//logout 
router.delete('/',logout)



module.exports = router