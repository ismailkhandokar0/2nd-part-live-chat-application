//externat imports 
const express = require('express') 

//internal imports
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')
const{
    getInbox
} = require('../controller/inboxController')
const {checkLogin} = require('../middleware/common/checkLogin')

const router = express.Router()


//inbox page 
router.get('/',decorateHtmlResponse('Inbox'),checkLogin,getInbox)


module.exports = router