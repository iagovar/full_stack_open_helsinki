export default function LiElement(props) {
    const keys = Object.keys(props)

    let joinedValues = ""

    for (const key of keys) {
        if (key != 'id') {
            joinedValues += String(props[key])
            joinedValues += ' - '
        }
    }

    // Removing last ' - '
    joinedValues = joinedValues.slice(0, joinedValues.length -4)

    return <li key={props.id}>{joinedValues}</li>;
}