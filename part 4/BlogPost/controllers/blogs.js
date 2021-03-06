const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const user = request.user;
  const body = request.body;
  if (body.title === undefined && body.url === undefined) {
    response.status(400).end();
  } else {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    console.log(decodedToken.id);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: "token missing or invalid",
      });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (blog === null) {
    return response.status(404).json({
      erroe: "resource not found",
    });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  } else {
    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({
        error: "unauthorized",
      });
    }
  }
  // response.status(204).end();
});

module.exports = blogsRouter;