const {expect, test} = require("@jest/globals");
const listHelper = require("../utils/list_helper");

test("Dummy fn that returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

// "describe" is for grouping tests, and the keywords "test" and "it" are the same.


describe("Total Likes Reducer", () => {
    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }  
    ];

    test("List of only one blog returns the likes of that one", () => {
        const result = listHelper.totalLikes(blogs.slice(0, 1));
        expect(result).toBe(blogs[0].likes);
    });

    test("Total likes of test blogs must be 36", () => {
        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(36);
    });

    test("Should throw error if argument is not an array", () => {
        expect(
            () => listHelper.totalLikes("test")
        ).toThrowError("Argument must be an array");
    });

    test("Empty array of blogs should return 0", () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });
});

describe("Favorite Blog Reducer", () => {

    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 12,
            __v: 0
        }  
    ];

    test("Empty list throws error", () => {
        expect(
            () => listHelper.favoriteBlog([])
        ).toThrowError("Array must not be empty");        
    });

    test("Should throw error if argument is not an array", () => {
        expect(
            () => listHelper.favoriteBlog("test")
        ).toThrowError("Argument must be an array");
    });

    test("List of only one blog returns that very blog as favorite", () => {
        const result = listHelper.favoriteBlog(blogs.slice(0, 1));
        expect(result).toEqual([blogs[0]]);
    });
    
    test("Favorite blogs of test blogs must be 5a422b3a1b54a676234d17f9 and 5a422bc61b54a676234d17fc", () => {
        const result = listHelper.favoriteBlog(blogs);
        const favortiesArray = [blogs[2], blogs[5]];
        expect(result).toEqual(favortiesArray);
    });
});

describe("Prolific author Reducer", () => {
    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 12,
            __v: 0
        }  
    ];

    test("Empty list throws error", () => {
        expect(
            () => listHelper.mostBlogs([])
        ).toThrowError("Array must not be empty");        
    });

    test("Should throw error if argument is not an array", () => {
        expect(
            () => listHelper.mostBlogs("test")
        ).toThrowError("Argument must be an array");
    });

    test("List of only one blog returns that very author", () => {
        const result = listHelper.mostBlogs(blogs.slice(0, 1));
        expect(result).toEqual({
            author: "Michael Chan",
            blogs: 1
        });
    });

    test("Most prolific author of test blogs is Robert C. Martin with 3 blogs", () => {
        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        });
    });

});

describe("Favorite author Reducer", () => {
    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 12,
            __v: 0
        }  
    ];

    test("Empty list throws error", () => {
        expect(
            () => listHelper.mostLikes([])
        ).toThrowError("Array must not be empty");        
    });

    test("Should throw error if argument is not an array", () => {
        expect(
            () => listHelper.mostLikes("test")
        ).toThrowError("Argument must be an array");
    });

    test("List of only one blog returns that very author", () => {
        const result = listHelper.mostLikes(blogs.slice(0, 1));
        expect(result).toEqual({
            author: "Michael Chan",
            likes: 7
        });
    });

    test("Favorite author of test blogs is Robert C. Martin with 22 likes", () => {
        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual({
            author: "Robert C. Martin",
            likes: 22
        });
    });


});