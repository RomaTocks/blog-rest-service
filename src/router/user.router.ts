import { Router } from 'express';
import controller from '../controller/user.controller';

const router = Router();

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
  
export default router;
