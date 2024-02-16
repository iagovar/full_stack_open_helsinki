export default function LiElement(props) {
    const keys = Object.keys(props);

    let joinedValues = "";

    for (const key of keys) {
        if (key != 'id') {
            joinedValues += String(props[key]);
            joinedValues += ' - ';
        }
    }

    // Removing last ' - '
    joinedValues = joinedValues.substring(0, joinedValues.length -3);

    return <li key={props.id}>{joinedValues}</li>;
}