import PropTypes from 'prop-types';

function Header({ course }) {
  return <h1>{course} (Through prop)</h1>;
}

Header.propTypes = {
  course: PropTypes.string,
};



export default Header;