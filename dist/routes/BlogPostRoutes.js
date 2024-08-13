"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogPostController_1 = require("../adapters/controllers/BlogPostController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/blogposts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [BlogPosts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', BlogPostController_1.createBlogPost);
/**
 * @swagger
 * /api/blogposts:
 *   get:
 *     summary: Get all blog posts
 *     tags: [BlogPosts]
 *     responses:
 *       200:
 *         description: Blog posts retrieved successfully
 */
router.get('/', BlogPostController_1.getBlogPosts);
/**
 * @swagger
 * /api/blogposts/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully
 *       404:
 *         description: Blog post not found
 */
router.get('/:id', BlogPostController_1.getBlogPostById);
/**
 * @swagger
 * /api/blogposts/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       404:
 *         description: Blog post not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', BlogPostController_1.updateBlogPost);
/**
 * @swagger
 * /api/blogposts/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog post ID
 *     responses:
 *       204:
 *         description: Blog post deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete('/:id', BlogPostController_1.deleteBlogPost);
exports.default = router;
