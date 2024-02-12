import Part from "./Part";

import PropTypes from 'prop-types';

export default function Content({parts}) {
    return (
        <div>
            {parts.map(
                function(currentValue) {
                    return <Part key={currentValue.id} name={currentValue.name} exercises={currentValue.exercises} />
                }
            )}
        </div>
    )
}

Content.propTypes = {
    parts: PropTypes.array
}