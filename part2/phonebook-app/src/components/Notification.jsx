export default function Notification({message, type}) {
    if (message === null) {return null}

    let classes = "notification";


    switch (type) {
        case "error":
            classes += " error";
            break;
        
        case "success":
            classes += " success";
            break;
    }

    return (
        <div className={classes}>
            {message}
        </div>
    )
}