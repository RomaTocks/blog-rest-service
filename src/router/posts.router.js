const router = require('express').Router();
const controller = require('../controller/post.controller')

router.route('/')
  .get(controller.getAll)
  .post(controller.savePost)
router.route('/:id')
  .get(controller.getById)
  .put(controller.updatePostById)
  .delete(controller.deleteById)
router.route('/:id/comments')
  .get(controller.getPostCommentsById)

module.exports = router;
