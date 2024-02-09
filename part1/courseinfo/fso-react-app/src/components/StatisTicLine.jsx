import { Fragment } from "react";
import PropTypes from 'prop-types';

export default function StatisTicLine({text, value}) {
    return (
        <Fragment>
            <td>{text}</td>
            <td>{value}</td>
        </Fragment>
    )
}

StatisTicLine.propTypes = {
    text: PropTypes.string,
    value: PropTypes.string
};