const router = require('express').Router();
const controller = require('../controller/user.controller')

router.route('/')
  .get(controller.getAll)
  .post(controller.saveUser)
router.route('/:id')
  .get(controller.getById)
  .put(controller.updateById)
  .delete(controller.deleteById)
router.route('/:id/posts')
  .get(controller.getPostsById)
router.route('/:id/comments')
  .get(controller.getCommentsById)
  
module.exports = router;
