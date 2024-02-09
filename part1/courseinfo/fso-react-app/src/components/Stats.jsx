import PropTypes from 'prop-types';
import StatisTicLine from './StatisTicLine';

export default function Stats(props) {

    // Nothing has been pressed
    if (props.stats.Bad + props.stats.Good + props.stats.Neutral === 0) {
        return (
            <div>
                <h2>Stats</h2>
                <p>No feedback given</p>
            </div>
        )
    }

    // Calculate stats values
    const positivePercentage = ((props.stats.Good / (props.stats.Bad + props.stats.Good + props.stats.Neutral)) * 100).toFixed(2);
    const average = ((props.stats.Good + props.stats.Neutral + props.stats.Bad) / 3).toFixed(2);
    const total = String(props.stats.Good + props.stats.Neutral + props.stats.Bad);


    return (
        <div>
            <h2>Stats</h2>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Good</th>
                    <th>Neutral</th>
                    <th>Bad</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td>{props.stats["Good"]}</td>
                    <td>{props.stats["Neutral"]}</td>
                    <td>{props.stats["Bad"]}</td>
                </tr>
                <tr>
                    <StatisTicLine text="Total" value={total}/>
                </tr>
                <tr>
                    <StatisTicLine text="Positive" value={positivePercentage}/>
                </tr>
                <tr>
                    <StatisTicLine text="Average" value={average}/>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

Stats.propTypes = {
    stats: PropTypes.object
}