import express from 'express'
import { FeedPosts, getUserPosts, likePost } from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'

const router =express.Router();
// READ
router.get('/', verifyToken, FeedPosts)
router.get("/:userId/post",verifyToken,getUserPosts);

// UPDATE
router.patch("/:id/like",verifyToken,likePost)
export default router