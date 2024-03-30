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


    

  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};

