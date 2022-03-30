const express = require('express');
const router = express.Router();
const {
  getCommentsForNews,
  setCommentsForNews,
  incrementLikesCounter,
  decrementLikesCounter,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', getCommentsForNews);
router.post('/:id', setCommentsForNews);
router.put('/increment/:id', incrementLikesCounter);
router.put('/decrement/:id', decrementLikesCounter);
router.delete('/:id', protect, deleteComment);

module.exports = router;
