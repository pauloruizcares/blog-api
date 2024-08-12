import { BlogPost } from '../entities/BlogPost';

export interface BlogPostRepositoryPort {
  fetchBlogPosts():  Promise<BlogPost[]>;
  createBlogPost(blogPost: BlogPost): Promise<BlogPost>;
  findBlogPostById(id: string): Promise<BlogPost | null>;
  updateBlogPost(blogPost: BlogPost): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
}
