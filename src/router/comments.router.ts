import { Router } from 'express';
import controller from '../controller/comment.controller';

const router = Router();

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


export default router;
