const dummy = (blogs) => {
    return 1;
};

function totalLikes(ArrayOfBlogObjects) {
    // Check if it's an array
    if (Array.isArray(ArrayOfBlogObjects) === false) {
        throw new Error("Argument must be an array");
    }

    let initialValue = 0;
    const listOfLikes = ArrayOfBlogObjects.map(blog => blog.likes);

    // Here .reduce gets 2 arguments: a function and an initial value
    const total = listOfLikes.reduce(
        (accumulator, currentValue) => accumulator + currentValue, initialValue
    );
    return total;
}

function favoriteBlog(ArrayOfBlogObjects) {
    // Check if it's an array
    if (Array.isArray(ArrayOfBlogObjects) === false) {
        throw new Error("Argument must be an array");
    }

    // Check if the array is empty
    if (ArrayOfBlogObjects.length === 0) {
        throw new Error("Array must not be empty");
    }

    const favoriteBlogs = [];
    const listOfLikes = ArrayOfBlogObjects.map(blog => blog.likes);
    const max = Math.max(...listOfLikes);

    for (let blog of ArrayOfBlogObjects) {
        if (blog.likes === max) {
            favoriteBlogs.push(blog);
        }
    }

    return favoriteBlogs;
}


function mostBlogs(ArrayOfBlogObjects) {
    // Check if it's an array
    if (Array.isArray(ArrayOfBlogObjects) === false) {
        throw new Error("Argument must be an array");
    }

    // Check if the array is empty
    if (ArrayOfBlogObjects.length === 0) {
        throw new Error("Array must not be empty");
    }

    // Make a list of authors
    const listOfAuthors = ArrayOfBlogObjects.map(blog => blog.author);
    const authorCount = {};

    // Count the times an author appears in the list
    for (let author of listOfAuthors) {
        if (author in authorCount) {
            authorCount[author] += 1;
        } else {
            authorCount[author] = 1;
        }
    }

    // Find the author with the highest count
    const max = Math.max(...Object.values(authorCount));

    // Return the name and times of the first author with the highest count
    for (let author in authorCount) {
        if (authorCount[author] === max) {
            return {
                author: author,
                blogs: authorCount[author]
            };
        }
    }
}

function mostLikes(ArrayOfBlogObjects) {
    // Check if it's an array
    if (Array.isArray(ArrayOfBlogObjects) === false) {
        throw new Error("Argument must be an array");
    }

    // Check if the array is empty
    if (ArrayOfBlogObjects.length === 0) {
        throw new Error("Array must not be empty");
    }

    // Make a set of authors
    const setOfAuthors = new Set(ArrayOfBlogObjects.map(blog => blog.author));

    // Build a an object with the authors as keys and 0 as values (the likes)
    let authorCount = {};
    for (let author of setOfAuthors) {
        authorCount[author] = 0;
    }

    // Count the likes for each author
    for (let blog of ArrayOfBlogObjects) {
        authorCount[blog.author] += blog.likes;
    }

    // Find the author with the highest count
    const max = Math.max(...Object.values(authorCount));

    // Return the name and times of the first author with the highest count
    for (let author in authorCount) {
        if (authorCount[author] === max) {
            return {
                author: author,
                likes: authorCount[author]
            };
        }
    }
}
    

  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};

