const blogsRouter = require("express").Router();
const Blog = require("../models/blogModel");


blogsRouter.get("/", (request, response) => {
    response.send("Server Running");
});

blogsRouter.get("/api/blogs", (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        });
});

blogsRouter.post("/api/blogs", (request, response) => {
    const thisBlog = new Blog(request.body);

    thisBlog
        .save()
        .then(result => {
            response.status(201).json(result);
        });
});

blogsRouter.delete("/api/blogs/:id", (request, response) => {

    Blog
        .deleteOne({ _id: request.params.id })
        .then(() => {
            response.status(204).end();
        });
});

module.exports = blogsRouter;    