const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const api = supertest(app);
const jwt = require("jsonwebtoken");


/**
 * Supertest does not require the app to be running, it starts it up and allocates
 * a temporal port to it automatically.
 * 
 * Also, we're testing on a testing DB, so we must set the state of such DB first
 * with a beforeEach function from Jest.
 * 
 */

const initialBlogs = require("./blogList").blogs;
const initialUsers = require("./userList").users;
const mergedList = initialBlogs.map(blog => {
    blog.user = initialUsers[0];
    return blog;
});
let AUTHORIZATION_KEY;
let ADMIN_ID;

beforeEach(async () => {
    // Create blogs and users for testing
    await Blog.deleteMany({});
    await User.deleteMany({});

    let userObjects = initialUsers.map(user => new User(user));
    let userPromiseArray = userObjects.map(user => user.save());
    await Promise.all(userPromiseArray);

    let ADMIN_ID = userObjects[0].id;

    let blogObjects = mergedList.map(blog => {
        blog.user = ADMIN_ID;
        return new Blog(blog);
    });
    let BlogPromiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(BlogPromiseArray);

    // Set authorization key
    const dataForJsonToken = {
        username: userObjects[0].username,
        id: ADMIN_ID
    };
    AUTHORIZATION_KEY = jwt.sign(dataForJsonToken, process.env.SECRET);
});

