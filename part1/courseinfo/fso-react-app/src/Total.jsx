import PropTypes from 'prop-types';

function Total(obj) {
    let total = 0;

    for (let i = 0; i < obj.coursesList.length; i++) {
        total += obj.coursesList[i].exercises;
    }

    return (
        <p>Number of exercises {total}</p>
    )
}

Total.propTypes = {
    coursesList: PropTypes.array
}

export default Total;