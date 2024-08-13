import { BlogPostService } from "../../../src/core/services/BlogPostService";
import { BlogPostRepositoryPort } from "../../../src/core/ports/BlogPostRepositoryPort";
import { BlogPost } from "../../../src/core/entities/BlogPost";

describe("BlogPostService", () => {
  let blogPostService: BlogPostService;
  let blogPostRepository: jest.Mocked<BlogPostRepositoryPort>;

  beforeEach(() => {
    blogPostRepository = {
      createBlogPost: jest.fn(),
      findBlogPostById: jest.fn(),
      updateBlogPost: jest.fn(),
      deleteBlogPost: jest.fn(),
      fetchBlogPosts: jest.fn(),
    };

    blogPostService = new BlogPostService(blogPostRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new blog post", async () => {
    const newPost = new BlogPost(
      "",
      "Test Title",
      "Test Content",
      "Test Author",
      new Date(),
      new Date()
    );
    blogPostRepository.createBlogPost.mockResolvedValue(newPost);

    const result = await blogPostService.createBlogPost(
      "Test Title",
      "Test Content",
      "Test Author"
    );

    expect(result).toEqual(newPost);
    expect(blogPostRepository.createBlogPost).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Title",
        content: "Test Content",
        author: "Test Author",
      })
    );
  });

  it("should get a blog post by id", async () => {
    const blogPost = new BlogPost(
      "1",
      "Test Title",
      "Test Content",
      "Test Author",
      new Date(),
      new Date()
    );
    blogPostRepository.findBlogPostById.mockResolvedValue(blogPost);

    const result = await blogPostService.getBlogPostById("1");

    expect(result).toEqual(blogPost);
    expect(blogPostRepository.findBlogPostById).toHaveBeenCalledWith("1");
  });

  it("should throw an error if blog post not found during update", async () => {
    blogPostRepository.findBlogPostById.mockResolvedValue(null);

    await expect(
      blogPostService.updateBlogPost(
        "1",
        "Updated Title",
        "Updated Content",
        "Updated Author"
      )
    ).rejects.toThrow("Blog post not found");
  });

  it("should update a blog post", async () => {
    const existingBlogPost = new BlogPost(
      "1",
      "Old Title",
      "Old Content",
      "Old Author",
      new Date(),
      new Date()
    );
    blogPostRepository.findBlogPostById.mockResolvedValue(existingBlogPost);
    const updatedBlogPost = {
      ...existingBlogPost,
      title: "Updated Title",
      content: "Updated Content",
      author: "Updated Author",
      updatedAt: new Date(),
    };
    blogPostRepository.updateBlogPost.mockResolvedValue(updatedBlogPost);

    const result = await blogPostService.updateBlogPost(
      "1",
      "Updated Title",
      "Updated Content",
      "Updated Author"
    );

    expect(result).toEqual(updatedBlogPost);
    expect(blogPostRepository.updateBlogPost).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Updated Title",
        content: "Updated Content",
        author: "Updated Author",
      })
    );
  });

  it("should delete a blog post", async () => {
    blogPostRepository.deleteBlogPost.mockResolvedValue(undefined);

    await blogPostService.deleteBlogPost("1");

    expect(blogPostRepository.deleteBlogPost).toHaveBeenCalledWith("1");
  });

  it("should fetch all blog posts", async () => {
    const blogPosts = [
      new BlogPost(
        "1",
        "Test Title",
        "Test Content",
        "Test Author",
        new Date(),
        new Date()
      ),
    ];
    blogPostRepository.fetchBlogPosts.mockResolvedValue(blogPosts);

    const result = await blogPostService.getBlogPosts();

    expect(result).toEqual(blogPosts);
    expect(blogPostRepository.fetchBlogPosts).toHaveBeenCalled();
  });
});
