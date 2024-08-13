import { Request, Response } from "express";
import { BlogPostService } from "../../core/services/BlogPostService";
import { inject, injectable } from "inversify";

@injectable()
export class BlogPostController {
  private blogPostService: BlogPostService;

  constructor(@inject(BlogPostService) blogPostService: BlogPostService) {
    this.blogPostService = blogPostService;
  }

  public createBlogPost = async (req: Request, res: Response) => {
    const { title, content, author } = req.body;
    try {
      const blogPost = await this.blogPostService.createBlogPost(
        title,
        content,
        author
      );
      res.status(201).json(blogPost);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getBlogPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const blogPost = await this.blogPostService.getBlogPostById(id);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.status(200).json(blogPost);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public updateBlogPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
      const blogPost = await this.blogPostService.updateBlogPost(
        id,
        title,
        content,
        author
      );
      res.status(200).json(blogPost);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getBlogPosts = async (req: Request, res: Response) => {
    try {
      const blogPosts = await this.blogPostService.getBlogPosts();
      res.status(200).json(blogPosts);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public deleteBlogPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.blogPostService.deleteBlogPost(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
