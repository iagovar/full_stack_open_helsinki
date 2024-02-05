import PropTypes from 'prop-types';
function Content(obj) {

    const coursesList = obj.coursesList;

    let HTMLtoReturn = [];

    for (let i = 0; i < coursesList.length; i++) {
        HTMLtoReturn.push(<Part part={coursesList[i]} />);
    }

    return (
        <ul>
            {HTMLtoReturn}
        </ul>
    )
}

function Part({ part }) {
    return (
        <li key={part.id}>
            {part.name} {part.exercises}
        </li>
    )
}

Content.propTypes = {
    coursesList: PropTypes.array
}

export default Content