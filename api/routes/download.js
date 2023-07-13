const express = require('express')
const router = express.Router()

const {download} = require('../controllers/download')

router.get('/:id',download)

module.exports = router