import LiElement from "./LiElement";

export default function FilteredList({listOfObjects, stringToSearch}) {
    const liElementsToReturn = []

    for (const entry of listOfObjects) {
        // Does entry contain the stringToSearch in any of its values?
        const isStringContained = Object.values(entry).some(value => String(value).toLowerCase().includes(stringToSearch.toLowerCase()));

        if (isStringContained) {
            liElementsToReturn.push(
                //<li key={entry.id}>{entry.name} - {entry.number}</li>
                <LiElement key={entry.id} {...entry} />
            )
        }
    }

    return liElementsToReturn;
}