"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostRepository = void 0;
const BlogPost_1 = require("../../core/entities/BlogPost");
const BlogPostModel_1 = __importDefault(require("../../models/BlogPostModel"));
class BlogPostRepository {
    async createBlogPost(blogPost) {
        const newBlogPost = new BlogPostModel_1.default({
            title: blogPost.title,
            content: blogPost.content,
            author: blogPost.author,
            createdAt: blogPost.createdAt,
            updatedAt: blogPost.updatedAt,
        });
        await newBlogPost.save();
        return new BlogPost_1.BlogPost(newBlogPost.id, newBlogPost.title, newBlogPost.content, newBlogPost.author, newBlogPost.createdAt, newBlogPost.updatedAt);
    }
    async findBlogPostById(id) {
        const blogPost = await BlogPostModel_1.default.findById(id);
        if (!blogPost)
            return null;
        return new BlogPost_1.BlogPost(blogPost.id, blogPost.title, blogPost.content, blogPost.author, blogPost.createdAt, blogPost.updatedAt);
    }
    async updateBlogPost(blogPost) {
        const updatedBlogPost = await BlogPostModel_1.default.findByIdAndUpdate(blogPost.id, blogPost, { new: true });
        if (!updatedBlogPost)
            throw new Error("Blog post not found");
        return new BlogPost_1.BlogPost(updatedBlogPost.id, updatedBlogPost.title, updatedBlogPost.content, updatedBlogPost.author, updatedBlogPost.createdAt, updatedBlogPost.updatedAt);
    }
    async deleteBlogPost(id) {
        await BlogPostModel_1.default.findByIdAndDelete(id);
    }
    async fetchBlogPosts() {
        const blogPosts = await BlogPostModel_1.default.find();
        return blogPosts.map((blogPost) => {
            return new BlogPost_1.BlogPost(blogPost.id, blogPost.title, blogPost.content, blogPost.author, blogPost.createdAt, blogPost.updatedAt);
        });
    }
}
exports.BlogPostRepository = BlogPostRepository;
