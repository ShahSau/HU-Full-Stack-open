const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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

test("title and url are missing returns 400", async () => {
  const newBlog = {
    author: "Robert C. Martin Sr.",
    __v: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)

  const blogAtEnd = await helper.blogInDb();
  expect(blogAtEnd).toHaveLength(helper.blogs.length);
});


test("deleating a single blog", async()=>{
  const blogAtStart = await helper.blogInDb();
  const blogToDelete = blogAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

    const blogsAtEnd = await helper.blogInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);
    const contents = blogsAtEnd.map((n) => n.title);
    expect(contents).not.toContain(blogToDelete.title);
})

test("updating a blog", async () => {
  const blogAtStart = await helper.blogInDb();
  const blogToModify = blogAtStart[0];
  blogToModify.likes = 15;
  await api
    .put(`/api/blogs/${blogToModify.id}`)
    .send(blogToModify)
    .expect(200);

  const blogAtEnd = await helper.blogInDb();
  expect(blogAtEnd).toHaveLength(helper.blogs.length);
  const chengedLike = blogAtEnd.find((b) => {
    if (b.id === blogToModify.id) {
      return b;
    }
  });
  expect(chengedLike.likes).toEqual(blogToModify.likes);
});

//users test
describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("creation fails with username less then 3", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "su",
      name: "shahriar saurov",
      password: "salainen",
      
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "is shorter than the minimum allowed length (3)"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with password less then 3", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "sus",
      name: "shahriar saurov",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Password must be 3 characters or long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});


afterAll(() => {
    mongoose.connection.close();
  });