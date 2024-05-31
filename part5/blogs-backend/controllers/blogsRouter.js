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
        // Check auth token (middleware in utils)
        if (!request.user) {
            return response.status(401).json({ error: "invalid token" });
        }

        // Load user info
        const user = await User.findById(request.user);

        const thisBlog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: request.user //ID already comes from token
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
        // Check auth token (middleware in utils)
        if (!request.user) {
            return response.status(401).json({ error: "invalid token" });
        }

        // Update user id in body so it reflects the user who's updating
        request.body.user = request.user;

        // new: true returns the updated document
        const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
        response.status(200).json(result);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
    try {
        // TODO: Try removing this kind of verifications, it's supposed to be handled by middleware in utils
        if (!request.user) {
            return response.status(401).json({ error: "invalid token" });
        }

        // Check if the user trying to delete the blog is the one who created it
        // (If no one created the blog, everyone can delete it, this is because initial test didn't have user)
        const blogToDelete = await Blog.findById(request.params.id);
        if (String(blogToDelete.user) !== request.user && blogToDelete.user !== undefined) {
            return response.status(401).json({ error: "User from token does not match user that created/updated the blog entry" });
        }

        await Blog.findByIdAndDelete(request.params.id);

        response.status(204).end();
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = blogsRouter;    