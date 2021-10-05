const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.blogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })
  

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.blogs.length);
});

test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body[0].id;
  expect(contents).toBeDefined();
})


test("successfully creates a new blog post", async () => {
  const newBlog = {
    title: "Type of wars",
    author: "Robert C. Martin Jr.",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeofWars.html",
    likes: 20,
    __v: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogAtEnd = await helper.blogInDb();
  expect(blogAtEnd).toHaveLength(helper.blogs.length + 1);
  const title = blogAtEnd.map((blog) => blog.title);
  expect(title).toContain("Type of wars");
});

test("like value will be zero", async () => {
  const newBlog = {
    title: "Type of wars part 2",
    author: "Robert C. Martin Sr.",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeofWarspart2.html",
    __v: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogAtEnd = await helper.blogInDb();
  const value = blogAtEnd[helper.blogs.length].likes;
  expect(value).toEqual(0);
});


afterAll(() => {
    mongoose.connection.close();
  });