// import React, { useState } from 'react';
// import axios from 'axios';

// const AddEvent = ({ currentUser }) => {
//     const [formData, setFormData] = useState({
//         title: '',
//         name: currentUser?.name || '',
//         date: '',
//         time: '',
//         location: '',
//         description: '',
//     });

//     const [message, setMessage] = useState('');

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();
//         const payload = {
//             ...formData,
//             attendeeCount: 0,
//             joinedUsers: [],
//         };

//         try {
//             const res = await axios.post('http://localhost:5000/api/events', payload, {
//                 withCredentials: true, // include cookies for auth
//             });
//             setMessage('Event added successfully!');
//             setFormData({
//                 title: '',
//                 name: currentUser?.name || '',
//                 date: '',
//                 time: '',
//                 location: '',
//                 description: '',
//             });
//         } catch (err) {
//             console.error(err);
//             setMessage('Failed to add event');
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
//             <h2 className="text-2xl font-bold mb-4 text-center">Add New Event</h2>
//             {message && <p className="mb-4 text-center text-green-600">{message}</p>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Event Title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className="input input-bordered w-full"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Your Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="input input-bordered w-full"
//                     required
//                 />
//                 <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleChange}
//                     className="input input-bordered w-full"
//                     required
//                 />
//                 <input
//                     type="time"
//                     name="time"
//                     value={formData.time}
//                     onChange={handleChange}
//                     className="input input-bordered w-full"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="location"
//                     placeholder="Location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     className="input input-bordered w-full"
//                     required
//                 />
//                 <textarea
//                     name="description"
//                     placeholder="Event Description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="textarea textarea-bordered w-full"
//                     required
//                 />
//                 <button type="submit" className="btn btn-primary w-full">
//                     Add Event
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddEvent;

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddEvent = ({ currentUser }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        name: currentUser?.name || '',
        date: '',
        time: '',
        location: '',
        description: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            ...formData,
            attendeeCount: 0,
            joinedUsers: [],
        };

        try {
            await axios.post('http://localhost:5000/api/events', payload, {
                withCredentials: true,
            });

            Swal.fire({
                title: 'Success!',
                text: 'Event added successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/events'); // redirect to events page
            });

        } catch (err) {
            console.error(err);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add event.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 my-10 border shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='flex justify-between gap-5 md:flex-row flex-col'>
                    <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" required />
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
                <div className='flex justify-between gap-5 md:flex-row flex-col'>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="input input-bordered w-full" required />
                    <input type="time" name="time" value={formData.time} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="input input-bordered w-full" required />
                <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" required />
                <button type="submit" className="btn btn-primary w-full">Add Event</button>
            </form>
        </div>
    );
};

export default AddEvent;
