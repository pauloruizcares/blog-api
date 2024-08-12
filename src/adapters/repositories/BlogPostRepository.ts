import { BlogPostRepositoryPort } from "../../core/ports/BlogPostRepositoryPort";
import { BlogPost } from "../../core/entities/BlogPost";
import BlogPostModel from "../../models/BlogPostModel";

export class BlogPostRepository implements BlogPostRepositoryPort {
  async createBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    const newBlogPost = new BlogPostModel({
      title: blogPost.title,
      content: blogPost.content,
      author: blogPost.author,
      createdAt: blogPost.createdAt,
      updatedAt: blogPost.updatedAt,
    });
    await newBlogPost.save();
    return new BlogPost(
      newBlogPost.id,
      newBlogPost.title,
      newBlogPost.content,
      newBlogPost.author,
      newBlogPost.createdAt,
      newBlogPost.updatedAt
    );
  }

  async findBlogPostById(id: string): Promise<BlogPost | null> {
    const blogPost = await BlogPostModel.findById(id);
    if (!blogPost) return null;
    return new BlogPost(
      blogPost.id,
      blogPost.title,
      blogPost.content,
      blogPost.author,
      blogPost.createdAt,
      blogPost.updatedAt
    );
  }

  async updateBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    const updatedBlogPost = await BlogPostModel.findByIdAndUpdate(
      blogPost.id,
      blogPost,
      { new: true }
    );
    if (!updatedBlogPost) throw new Error("Blog post not found");
    return new BlogPost(
      updatedBlogPost.id,
      updatedBlogPost.title,
      updatedBlogPost.content,
      updatedBlogPost.author,
      updatedBlogPost.createdAt,
      updatedBlogPost.updatedAt
    );
  }

  async deleteBlogPost(id: string): Promise<void> {
    await BlogPostModel.findByIdAndDelete(id);
  }

  async fetchBlogPosts(): Promise<BlogPost[]> {
    const blogPosts = await BlogPostModel.find();
    return blogPosts.map((blogPost) => {
      return new BlogPost(
        blogPost.id,
        blogPost.title,
        blogPost.content,
        blogPost.author,
        blogPost.createdAt,
        blogPost.updatedAt
      );
    });
  }
}
