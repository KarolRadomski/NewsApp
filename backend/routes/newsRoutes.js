const express = require('express')
const router = express.Router()
const {getNews, setNews, updateNews, deleteNews} = require("../controllers/newsController")


router.get('/', getNews)
router.post('/', setNews)
router.put('/:id', updateNews)
router.delete('/:id', deleteNews)

module.exports = router