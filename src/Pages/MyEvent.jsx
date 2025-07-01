// import React from 'react';

// const MyEvent = () => {
//     return (
//         <div>
//             <h1>
//                 your events
//             </h1>
//         </div>
//     );
// };

// export default MyEvent;

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Modal from './UpdateModal'; // assumed you have a modal or will create it

const fetchUserEvents = async () => {
    const res = await fetch('https://event-server-two-fawn.vercel.app/api/events', {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
};

const MyEvent = ({ currentUser }) => {
    const queryClient = useQueryClient();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const { data = [], isLoading, isError } = useQuery({
        queryKey: ['events'],
        queryFn: fetchUserEvents,
    });

    const userEvents = data.filter(
        (event) => event.creatorEmail === currentUser?.email
    );

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await fetch(`https://event-server-two-fawn.vercel.app/api/events/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to delete event');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
            Swal.fire('Deleted!', 'Your event has been removed.', 'success');
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete the event.', 'error');
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete your event.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    const handleUpdateClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError) return <p className="text-red-500 text-center">Error loading events.</p>;

    return (
        <section className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">My Events</h1>

            {userEvents.length === 0 ? (
                <p className="text-center">You haven't added any events yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userEvents.map((event) => (
                        <div key={event._id} className="border shadow-md rounded-xl p-6 space-y-3">
                            <h2 className="text-xl font-semibold">{event.title}</h2>
                            <p><strong>Name:</strong> {event.creatorName}</p>
                            <p><strong>Date & Time:</strong> {event.date} at {event.time}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>Attendees:</strong> {event.attendeeCount || 0}</p>
                            <div className="flex gap-4 mt-3">
                                <button
                                    onClick={() => handleUpdateClick(event)}
                                    className="btn btn-primary btn-sm"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="btn btn-error btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            {isModalOpen && selectedEvent && (
                <Modal
                    event={selectedEvent}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedEvent(null);
                    }}
                />
            )}
        </section>
    );
};

export default MyEvent;
