import FeedbackButton from "./FeedbackButton";
import PropTypes from 'prop-types';


function Feedback({lastBtnClicked, setLastBtnClicked, setStats}) {

    // Managing state
    function handleOnClick(btnText) {
        setLastBtnClicked(btnText);
        setStats(prev => ({...prev, [btnText]: prev[btnText] + 1}))
    }

    return (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
            <FeedbackButton buttonText="Good" onClick={handleOnClick}/>
            <FeedbackButton buttonText="Neutral" onClick={handleOnClick}/>
            <FeedbackButton buttonText="Bad" onClick={handleOnClick}/>
            <br></br>
            {lastBtnClicked && <p>You clicked: {lastBtnClicked}</p>}
        </div>
    )
}



Feedback.propTypes = {
    lastBtnClicked: PropTypes.string,
    setLastBtnClicked: PropTypes.func,
    setStats: PropTypes.func
} 

export default Feedback