import { BlogPostRepositoryPort } from "../ports/BlogPostRepositoryPort";
import { BlogPost } from "../entities/BlogPost";
import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";

@injectable()
export class BlogPostService {
  constructor(
    @inject(TYPES.BlogPostRepository)
    private blogPostRepository: BlogPostRepositoryPort
  ) {}

  async createBlogPost(
    title: string,
    content: string,
    author: string
  ): Promise<BlogPost> {
    const blogPost = new BlogPost(
      "",
      title,
      content,
      author,
      new Date(),
      new Date()
    );
    return this.blogPostRepository.createBlogPost(blogPost);
  }

  async getBlogPostById(id: string): Promise<BlogPost | null> {
    return this.blogPostRepository.findBlogPostById(id);
  }

  async updateBlogPost(
    id: string,
    title: string,
    content: string,
    author: string
  ): Promise<BlogPost> {
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

  async deleteBlogPost(id: string): Promise<void> {
    await this.blogPostRepository.deleteBlogPost(id);
  }

  async getBlogPosts() {
    const blogPosts = await this.blogPostRepository.fetchBlogPosts();
    return blogPosts;
  }
}
