import PropTypes from 'prop-types';

export default function FeedbackButton({buttonText, onClick}) {

    return (
        <button type="button" onClick={() => onClick(buttonText)}>{buttonText}</button>
    )
}

FeedbackButton.propTypes = {
    buttonText: PropTypes.string,
    onClick: PropTypes.func
}
