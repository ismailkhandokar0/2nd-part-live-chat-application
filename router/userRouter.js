//external imports 
const express = require('express')
const { route } = require('express/lib/application')


//internal imports 
const{
getUsers,
addUser,
removeUser
} = require('../controller/userController')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')
const avatarUpload = require('../middleware/users/avatarUpload')
const {
    addUserValidator,
    addUserValidationHandler
} = require('../middleware/users/userValidator')

const{ 
    checkLogin
} = require('../middleware/common/checkLogin')

const router = express.Router()  

router.get('/',decorateHtmlResponse('HOme'),checkLogin,getUsers)

router.post('/',checkLogin,avatarUpload,addUserValidator,addUserValidationHandler,addUser)

//remove user 
router.delete('/:id',removeUser)




module.exports = router