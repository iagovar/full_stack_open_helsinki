import PropTypes from 'prop-types';

export default function Header(props) {
    return (
        <h1>{props.title}</h1>
    )
}

Header.propTypes = {
    title: PropTypes.string
}