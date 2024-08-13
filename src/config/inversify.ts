import { Container } from "inversify";
import { TYPES } from "./types";

import { BlogPostRepository } from "../adapters/repositories/BlogPostRepository";
import { BlogPostService } from "../core/services/BlogPostService";
import { BlogPostController } from "../adapters/controllers/BlogPostController";
import { BlogPostRepositoryPort } from "../core/ports/BlogPostRepositoryPort";

const container = new Container();

container.bind<BlogPostController>(TYPES.BlogPostController).toSelf();
container.bind<BlogPostService>(TYPES.BlogPostService).toSelf();
container.bind<BlogPostRepositoryPort>(TYPES.BlogPostRepository).to(BlogPostRepository);

export { container };