const blogsRouter = require("express").Router();
const Blog = require("../models/blogModel");


blogsRouter.get("/", (request, response) => {
    response.send("Server Running");
});

blogsRouter.get("/api/blogs", async (request, response) => {
    try {
        const blogs = await Blog.find({});
        blogs.map(blog => blog.toJSON()); // toJSON is a fn defined in Blog model
        response.json(blogs);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

blogsRouter.post("/api/blogs", async (request, response) => {
    try {
        const thisBlog = new Blog(request.body);
        const result = await thisBlog.save();
        response.status(201).json(result);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = blogsRouter;    