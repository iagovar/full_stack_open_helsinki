const blogsRouter = require("express").Router();
const Blog = require("../models/blogModel");
const User = require("../models/userModel");


blogsRouter.get("/", (request, response) => {
    response.send("Server Running");
});

blogsRouter.get("/api/blogs", async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate("user", { username: 1});
        blogs.map(blog => blog.toJSON()); // toJSON is a fn defined in Blog model
        response.json(blogs);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

blogsRouter.post("/api/blogs", async (request, response) => {
    try {
        // Load user info
        const user = await User.findById(request.body.user);

        const thisBlog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: user.id
        });
        const result = await thisBlog.save();

        // Add blog to user
        user.blogs = user.blogs.concat(result._id);
        await user.save();

        response.status(201).json(result);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

blogsRouter.post("/api/blogs/:id", async (request, response) => {
    try {
        // new: true returns the updated document
        const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
        response.status(200).json(result);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
    try {
        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = blogsRouter;    