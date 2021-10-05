const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async(request, response,next) => {
  const blogs = await Blog.find({})
  try{
    response.json(blogs.map(blog=> blog.toJSON()))
  }catch(exception){
    next(exception)
  }
});

blogsRouter.post("/", async (request, response,next) => {
  const blog = new Blog(request.body);
  if(blog.title === undefined && blog.url === undefined){
    response.status(400).end()
  }else{
  try{
    const result = await blog.save()
    response.status(201).json(result);
  }catch(exception){
    next(exception)
  }
}
});

blogsRouter.delete("/:id", async(request,response)=>{
  await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end();
})

module.exports = blogsRouter;