const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const api = supertest(app);


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
    const randomIndex = Math.floor(Math.random() * initialUsers.length);
    blog.user = initialUsers[randomIndex];
    return blog;
});

// Runs before each test: https://jestjs.io/es-ES/docs/api#beforeeachfn-tiempo
beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    let userObjects = initialUsers.map(user => new User(user));
    let userPromiseArray = userObjects.map(user => user.save());
    await Promise.all(userPromiseArray);

    
    const adminUserId = userObjects[0].id;
    let blogObjects = mergedList.map(blog => {
        blog.user = adminUserId;
        return new Blog(blog);
    });
    let BlogPromiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(BlogPromiseArray);
});

describe("Testing adding and retrieving blogs", () => {

    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/); // Second argument is a regular expression
    }, 10000); // Last parameter indicates waiting time in miliseconds
    
    
    test("Blog DB has the same length as the initial list", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(initialBlogs.length);
    });
    
    test("A specific note is within the returned blogs", async () => {
        const response = await api.get("/api/blogs");
        const contents = response.body.map(thisBlog => thisBlog.title);
        expect(contents).toContain(initialBlogs[2].title);
    });
    
    test("A valid blog can be added", async () => {

        const adminUserId = await User.findOne({ username: "admin" }).id;

        const newBlog = {
            title: "Iagovar Blog",
            author: "Iago Var",
            url: "https://iagovar.com/",
            likes: 7,
            user: adminUserId
        };
    

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);
    
        const response = await api.get("/api/blogs");
        const contents = response.body.map(thisBlog => thisBlog.title);
    
        expect(response.body).toHaveLength(initialBlogs.length + 1);
        expect(contents).toContain(newBlog.title);
    });
    
    test("Blog without URL is not added", async () => {
        const newBlog = {
            author: "Iago Var 2",
            likes: 7,
            user: initialUsers[0].id
        };
    
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(initialBlogs.length);
    });
    
    test("Blog without likes is default to 0", async () => {
        const newBlog = {
            title: "No likes blog",
            author: "Iago Var",
            url: "https://iagovar.com/",
            user: initialUsers[0].id
        };
    
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);
    
        const response = await api.get("/api/blogs");
        const thisBlog = response.body.find(blog => blog.title === newBlog.title);
        expect(thisBlog.likes).toBe(0);
    });
    
    test("Blog property '_id' is returned as 'id'", async () => {
        const response = await api.get("/api/blogs");
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined(); // Verifies that the property 'id' is not undefined
        });
    });
    
    test("Invalid blogs are not added", async () => {
        const newBlogs = [
            {
                author: "Iago Var",
                url: "https://notitle.com/",
                likes: 7
            },
            {
                title: "No url blog",
                author: "Iago Var",
                likes: 7
            },
            {
                title: "No likes blog",
                author: "Iago Var",
                url: "https://iagovar.com/"
            }
        ];
    
        await api.post("/api/blogs").send(newBlogs[0]).expect(400); // No title
        await api.post("/api/blogs").send(newBlogs[1]).expect(400); // No url
        await api.post("/api/blogs").send(newBlogs[2]).expect(201); // No likes, should be fine
    
    });
});

describe("Testing deleting and updating blogs", () => {
    test("Succeeds with status code 204 if id is valid", async () => {
        await api.delete(`/api/blogs/${initialBlogs[0]._id}`).expect(204);
    });

    test("Fails with status code 400 if id is invalid", async () => {
        await api.delete("/api/blogs/123456789").expect(400);
    });

    test("Updating a valid blog suceeds", async () => {
        const blog = initialBlogs[0];
        blog.likes += 1;
        await api
            .post(`/api/blogs/${blog._id}`)
            .send(blog)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    }, 10000);

    test("Updating an invalid blog fails", async () => {
        const blog = initialBlogs[0];
        blog.likes = "invalid, it has to be a number";
        await api
            .post(`/api/blogs/${blog._id}`)
            .send(blog)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });
});




afterAll(() => {
    mongoose.connection.close();
});