const express = require('express');
const router = express.Router();

const userFile = require('./user.js')
const taskFile = require('./tasks.js')

router.use('/user' , userFile)
router.use('/task' , taskFile)

module.exports = router;