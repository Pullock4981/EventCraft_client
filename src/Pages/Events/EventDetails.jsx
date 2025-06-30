import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const fetchEvents = async () => {
    const res = await fetch('/events.json');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
};

const EventDetails = () => {
    const { id } = useParams();
    const { data = [] } = useQuery({ queryKey: ['events'], queryFn: fetchEvents });

    const event = data.find((e) => e.id === id);

    if (!event) return <div className="text-center mt-20">Event not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg"
            />
            <h1 className="text-3xl font-bold mb-2 text-primary">{event.title}</h1>
            <p className="text-sm text-base-content/80 mb-1"><strong>Posted by:</strong> {event.name}</p>
            <p className="text-sm mb-1"><strong>Date:</strong> {event.date} at {event.time}</p>
            <p className="text-sm mb-1"><strong>Location:</strong> {event.location}</p>
            <p className="text-base mt-4 leading-relaxed">{event.description}</p>
            <p className="text-sm mt-4 font-medium">Total Attendees: {event.attendeeCount}</p>
        </div>
    );
};

export default EventDetails;
