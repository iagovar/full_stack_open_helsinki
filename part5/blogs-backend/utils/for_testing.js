const reverse = (string) => {
    return string
        .split("")
        .reverse()
        .join("");
};

const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item;
    };
  
    let result;

    if (array.length === 0) {
        result = 0;
    } else {
        result = array.reduce(reducer, 0) / array.length;
    }
    
    return result;
};
  
module.exports = {
    reverse,
    average,
};