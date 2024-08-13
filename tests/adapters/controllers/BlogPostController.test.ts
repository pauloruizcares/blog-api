import request from "supertest";
import express, { Application } from "express";
import {
  createBlogPost,
  getBlogPostById,
  updateBlogPost,
  getBlogPosts,
  deleteBlogPost,
} from "../../../src/adapters/controllers/BlogPostController";
import { BlogPostService } from "../../../src/core/services/BlogPostService";
import { BlogPostRepository } from "../../../src/adapters/repositories/BlogPostRepository";
import { BlogPost } from "../../../src/core/entities/BlogPost";

const app: Application = express();
app.use(express.json());

app.post("/blog-posts", createBlogPost);
app.get("/blog-posts/:id", getBlogPostById);
app.put("/blog-posts/:id", updateBlogPost);
app.get("/blog-posts", getBlogPosts);
app.delete("/blog-posts/:id", deleteBlogPost);

jest.mock("../../../src/core/services/BlogPostService");
jest.mock("../../../src/adapters/repositories/BlogPostRepository");

describe("BlogPost Controller", () => {
  let blogPostService: jest.Mocked<BlogPostService>;

  beforeEach(() => {
    blogPostService = new BlogPostService(
      new BlogPostRepository()
    ) as jest.Mocked<BlogPostService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new blog post", async () => {
    const newPost: BlogPost = {
      id: "1",
      title: "Test Title",
      content: "Test Content",
      author: "Test Author",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    blogPostService.createBlogPost.mockResolvedValue(newPost);

    const response = await request(app).post("/blog-posts").send(newPost);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newPost);
    expect(blogPostService.createBlogPost).toHaveBeenCalledWith(
      "Test Title",
      "Test Content",
      "Test Author"
    );
  });

  it("should get a blog post by id", async () => {
    const blogPost: BlogPost = {
      id: "1",
      title: "Test Title",
      content: "Test Content",
      author: "Test Author",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    blogPostService.getBlogPostById.mockResolvedValue(blogPost);

    const response = await request(app).get("/blog-posts/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(blogPost);
    expect(blogPostService.getBlogPostById).toHaveBeenCalledWith("1");
  });

  it("should update a blog post by id", async () => {
    const updatedPost: BlogPost = {
      id: "1",
      title: "Updated Title",
      content: "Updated Content",
      author: "Updated Author",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    blogPostService.updateBlogPost.mockResolvedValue(updatedPost);

    const response = await request(app).put("/blog-posts/1").send(updatedPost);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedPost);
    expect(blogPostService.updateBlogPost).toHaveBeenCalledWith(
      "1",
      "Updated Title",
      "Updated Content",
      "Updated Author"
    );
  });

  it("should get all blog posts", async () => {
    const blogPosts: BlogPost[] = [
      {
        id: "1",
        title: "Test Title",
        content: "Test Content",
        author: "Test Author",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    blogPostService.getBlogPosts.mockResolvedValue(blogPosts);

    const response = await request(app).get("/blog-posts");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(blogPosts);
    expect(blogPostService.getBlogPosts).toHaveBeenCalled();
  });

  it("should delete a blog post by id", async () => {
    blogPostService.deleteBlogPost.mockResolvedValue(undefined);

    const response = await request(app).delete("/blog-posts/1");

    expect(response.status).toBe(204);
    expect(blogPostService.deleteBlogPost).toHaveBeenCalledWith("1");
  });
});
