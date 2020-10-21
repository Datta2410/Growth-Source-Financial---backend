const { Router } = require('express')
const express = require('express')
const router = express.Router()

const loanAppController = require('../controllers/loanApplication')

router.post('/newLoanApp', loanAppController.create_loanApp)

module.exports = router