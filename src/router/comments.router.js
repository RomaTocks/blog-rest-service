const router = require('express').Router();
const controller = require('../controller/comment.controller')

router.route('/')
  .get(controller.getAll)
  .post(controller.saveComment)
router.route('/:id')
  .get(controller.getById)
  .put(controller.updateById)
  .delete(controller.deleteById)
router.route('/:id/posts')
  .get(controller.getPostByCommentId)
router.route('/:id/user')
  .get(controller.getUserByCommentId)


module.exports = router;
