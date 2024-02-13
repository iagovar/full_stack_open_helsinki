export default function Filter({newFilter, setNewFilter}) {
    return (
    <div>
        Filter by entries containing: &nbsp;
        <input className='filter' value={newFilter} onChange={event => setNewFilter(event.target.value)}/>
    </div>
    )
}