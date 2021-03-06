const express = require('express');
const router = express.Router();
const {
  getNews,
  getOneNews,
  setNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getNews);
router.get('/:id', getOneNews);
router.post('/', protect, setNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;
