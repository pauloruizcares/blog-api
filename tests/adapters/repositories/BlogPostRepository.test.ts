import { BlogPostRepository } from "../../../src/adapters/repositories/BlogPostRepository";
import { BlogPost } from "../../../src/core/entities/BlogPost";
import BlogPostModel from "../../../src/models/BlogPostModel";

jest.mock("../../../src/models/BlogPostModel");

describe("BlogPostRepository", () => {
  let repository: BlogPostRepository;

  beforeEach(() => {
    repository = new BlogPostRepository();
  });

  it("should create a blog post", async () => {
    const mockBlogPost = {
      id: "1",
      title: "Title",
      content: "Content",
      author: "Author",
      createdAt: new Date(),
      updatedAt: new Date(),
      save: jest.fn().mockResolvedValue({
        id: "1",
        title: "Title",
        content: "Content",
        author: "Author",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };

    (BlogPostModel as unknown as jest.Mock).mockImplementation(() => mockBlogPost);

    const createdBlogPost = await repository.createBlogPost(
      new BlogPost("1", "Title", "Content", "Author", new Date(), new Date())
    );

    expect(createdBlogPost).toEqual(
      expect.objectContaining({
        id: "1",
        title: "Title",
        content: "Content",
        author: "Author",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it("should find a blog post by id", async () => {
    const mockBlogPost = {
      id: "1",
      title: "Title",
      content: "Content",
      author: "Author",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (BlogPostModel.findById as jest.Mock).mockResolvedValue(mockBlogPost);

    const foundBlogPost = await repository.findBlogPostById("1");

    expect(foundBlogPost).toEqual(expect.objectContaining(mockBlogPost));
  });

  it("should update a blog post", async () => {
    const mockBlogPost = {
      id: "1",
      title: "Updated Title",
      content: "Updated Content",
      author: "Updated Author",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (BlogPostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      mockBlogPost
    );

    const updatedBlogPost = await repository.updateBlogPost(
      new BlogPost(
        "1",
        "Updated Title",
        "Updated Content",
        "Updated Author",
        new Date(),
        new Date()
      )
    );

    expect(updatedBlogPost).toEqual(expect.objectContaining(mockBlogPost));
  });

  it("should delete a blog post", async () => {
    (BlogPostModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);

    await expect(repository.deleteBlogPost("1")).resolves.toBeUndefined();
  });

  it("should fetch all blog posts", async () => {
    const mockBlogPosts = [
      {
        id: "1",
        title: "Title 1",
        content: "Content 1",
        author: "Author 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Title 2",
        content: "Content 2",
        author: "Author 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (BlogPostModel.find as jest.Mock).mockResolvedValue(mockBlogPosts);

    const fetchedBlogPosts = await repository.fetchBlogPosts();

    expect(fetchedBlogPosts).toEqual(expect.arrayContaining(mockBlogPosts));
  });
});
