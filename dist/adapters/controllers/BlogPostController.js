"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = exports.getBlogPosts = exports.updateBlogPost = exports.getBlogPostById = exports.createBlogPost = void 0;
const BlogPostService_1 = require("../../core/services/BlogPostService");
const BlogPostRepository_1 = require("../repositories/BlogPostRepository");
const blogPostService = new BlogPostService_1.BlogPostService(new BlogPostRepository_1.BlogPostRepository());
const createBlogPost = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const blogPost = await blogPostService.createBlogPost(title, content, author);
        res.status(201).json(blogPost);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createBlogPost = createBlogPost;
const getBlogPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const blogPost = await blogPostService.getBlogPostById(id);
        if (!blogPost) {
            return res.status(404).json({ error: "Blog post not found" });
        }
        res.status(200).json(blogPost);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getBlogPostById = getBlogPostById;
const updateBlogPost = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
        const blogPost = await blogPostService.updateBlogPost(id, title, content, author);
        res.status(200).json(blogPost);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateBlogPost = updateBlogPost;
const getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await blogPostService.getBlogPosts();
        res.status(200).json(blogPosts);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getBlogPosts = getBlogPosts;
const deleteBlogPost = async (req, res) => {
    const { id } = req.params;
    try {
        await blogPostService.deleteBlogPost(id);
        res.status(204).end();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteBlogPost = deleteBlogPost;
