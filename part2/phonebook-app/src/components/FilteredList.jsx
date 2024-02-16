import LiElement from "./LiElement";

export default function FilteredList({listOfObjects, stringToSearch, methods}) {
    const liElementsToReturn = []

    for (const entry of listOfObjects) {
        // Does entry contain the stringToSearch in any of its values?
        const isStringContained = Object.values(entry).some(value => String(value).toLowerCase().includes(stringToSearch.toLowerCase()));

        if (isStringContained) {
            liElementsToReturn.push(
                //<li key={entry.id}>{entry.name} - {entry.number}</li>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}} key={entry.id}><LiElement key={entry.id} {...entry}/>
                <button onClick={() => methods.deletePerson(entry.id)}>Delete</button></div>
            )
        }
    }

    return liElementsToReturn;
}