import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

import PropTypes from 'prop-types';
export default function Course(props) {
    console.log(props);
    return (
        <div>
            <Header title={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

Course.propTypes = {
    course: PropTypes.object,
    name: PropTypes.string,
    parts: PropTypes.array
}
