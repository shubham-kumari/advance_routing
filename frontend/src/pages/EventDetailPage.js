import { json, Link, redirect, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
    // const params = useParams();
    const data = useRouteLoaderData('event-detail');

    return (
        <>
            {/* <h1>EventDetailPage</h1>
        <p>{params.eventId}</p>
        <p><Link to='..' relative="path">back</Link></p> */}
            <EventItem event={data.event} />

        </>
    )
}

export default EventDetailPage;


export async function loader({ request, params }) {
    // fetch(`http://localhost:8080/events/${params.id}`) we cant use params beacause hooks cant be access there
    const id = params.eventId;
    const response = await fetch(`http://localhost:8080/events/${id}`);
    if (!response.ok) {
        throw json(
            { message: "Could not fetchdetails for selected event." },
            { status: 500 }
        )
    }
    else {
        return response;
    }

}

export async function action({ params, request }) {
    const id = params.eventId;
    console.log("Request method:", request.method);
    
    const response = await fetch("http://localhost:8080/events/" + id, { method: request.method });
    
    if (!response.ok) {
        throw json(
            { message: "Could not delete event." },
            { status: 500 }
        )
    }
    else {
        return redirect('/events');
    }
}