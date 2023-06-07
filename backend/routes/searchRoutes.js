const express = require('express')
const router = express.Router()

const {getSearchResults,trendingSearch} = require('../controllers/searchController')
const {fetchAudioResult} = require('../controllers/fetchAudio')
const {getLyrics} = require('../controllers/getLyrics')

router.get('/',getSearchResults)
router.get('/trending',trendingSearch)
router.get('/:id',fetchAudioResult)



module.exports = router