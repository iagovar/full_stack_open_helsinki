import PropTypes from 'prop-types';

export default function Total({parts}) {
    const totalExercises = parts.reduce(
        function(accumulator, currentValue) {
            return accumulator + currentValue.exercises
        },
        0
    );
    return (
        <p>
            <b>Total of {totalExercises} exercises</b>
        </p>
    )
}

Total.propTypes = {
    parts: PropTypes.array
}