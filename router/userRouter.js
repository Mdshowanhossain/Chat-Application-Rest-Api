const express = require('express');

const { userController } = require('../controller/UserController')

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

const router = express.Router();

router.get('/', decorateHtmlResponse('Users'), userController)

module.exports = router;