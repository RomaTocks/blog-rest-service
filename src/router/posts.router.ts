import { Router } from 'express';
import controller from '../controller/post.controller';

const router = Router();

router.route('/')
  .get(controller.getAll)
  .post(controller.savePost)
router.route('/:id')
  .get(controller.getById)
  .put(controller.updatePostById)
  .delete(controller.deleteById)
router.route('/:id/comments')
  .get(controller.getPostCommentsById)

export default router;
