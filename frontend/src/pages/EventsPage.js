
import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

const EVENTS = [
    { id: 'e1', title: 'event-1' },
    { id: 'e2', title: 'event-2' },
    { id: 'e3', title: 'event-3' },
]
function EventsPage() {

    const data = useLoaderData();
    // if(data.isError === true){
    //     return <p>{data.message}</p>
    // }
    const events = data.events;
    return (
        <>
            {/* <h1> EventsPage</h1>
        <ul>
            {EVENTS.map((event) => {
                return(
                    <li key={event.id}><Link to={`/events/${event.id}`}>{event.title}</Link></li>
                )
            })}
        </ul> */}


            <EventsList events={events} />

        </>
    )
}
export default EventsPage;


export async function loader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        //...
        // return { isError: true, message: 'Could not fetch Events.'}
        // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {status: 500})
        throw json(
            {message: 'Could not fetch events.'},
            {status: 500}
        )
    } else {
        // const resData = await response.json();
        return response;
    }
}