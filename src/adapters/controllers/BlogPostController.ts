import { Request, Response } from "express";
import { BlogPostService } from "../../core/services/BlogPostService";
import { BlogPostRepository } from "../repositories/BlogPostRepository";

const blogPostService = new BlogPostService(new BlogPostRepository());

export const createBlogPost = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  try {
    const blogPost = await blogPostService.createBlogPost(
      title,
      content,
      author
    );
    res.status(201).json(blogPost);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getBlogPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blogPost = await blogPostService.getBlogPostById(id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(blogPost);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  try {
    const blogPost = await blogPostService.updateBlogPost(
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

export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const blogPosts = await blogPostService.getBlogPosts();
    res.status(200).json(blogPosts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await blogPostService.deleteBlogPost(id);
    res.status(204).end();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
