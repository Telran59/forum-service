import express from "express";
import postController from "../controllers/post.controller.js";
import validate from "../middleware/validation.middleware.js";
import authorization from '../middleware/authorization.middleware.js';

const router = express.Router();

router.post('/post/:author',
    validate('createPost'),
    authorization.isOwner('author'),
    postController.createPost);
router.get('/post/:id', postController.getPostById);
router.patch('/post/:id/like', postController.addLike);
router.get('/posts/author/:author', postController.getPostsByAuthor);
router.patch('/post/:id/comment/:commenter',
    validate('addComment'),
    authorization.isOwner('commenter'),
    postController.addComment);
router.delete('/post/:id', postController.deletePost);
router.get('/posts/tags', postController.getPostsByTags);
router.get('/posts/period', validate('dateFormat', 'query'), postController.getPostsByPeriod);
router.patch('/post/:id',
    validate('updatePost'),
    authorization.isPostAuthor('id'),
    postController.updatePost);

export default router;