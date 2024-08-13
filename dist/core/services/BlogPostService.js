"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostService = void 0;
const BlogPost_1 = require("../entities/BlogPost");
class BlogPostService {
    constructor(blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }
    async createBlogPost(title, content, author) {
        const blogPost = new BlogPost_1.BlogPost("", title, content, author, new Date(), new Date());
        return this.blogPostRepository.createBlogPost(blogPost);
    }
    async getBlogPostById(id) {
        return this.blogPostRepository.findBlogPostById(id);
    }
    async updateBlogPost(id, title, content, author) {
        const existingBlogPost = await this.blogPostRepository.findBlogPostById(id);
        if (!existingBlogPost) {
            throw new Error("Blog post not found");
        }
        existingBlogPost.title = title;
        existingBlogPost.content = content;
        existingBlogPost.author = author;
        existingBlogPost.updatedAt = new Date();
        return this.blogPostRepository.updateBlogPost(existingBlogPost);
    }
    async deleteBlogPost(id) {
        await this.blogPostRepository.deleteBlogPost(id);
    }
    async getBlogPosts() {
        const blogPosts = await this.blogPostRepository.fetchBlogPosts();
        return blogPosts;
    }
}
exports.BlogPostService = BlogPostService;
