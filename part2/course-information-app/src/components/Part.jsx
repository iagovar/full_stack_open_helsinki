import PropTypes from 'prop-types';

export default function Part(props) {
    return (
        <p>
            Name: &emsp; {props.name} &emsp; Exercises: {props.exercises}
        </p>
    )
}

Part.propTypes = {
    name: PropTypes.string,
    exercises: PropTypes.number
}