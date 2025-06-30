import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Link } from 'react-router';

const EventCard = ({ event, index, onJoin, currentUser }) => {
  const joined = event.joinedUsers?.includes(currentUser?.email);

  return (
    <motion.div
      className="bg-base-200 rounded-xl shadow p-4 hover:shadow-xl transition-all flex flex-col md:flex-row"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Info */}
      <div className="md:w-2/3 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary mb-1">{event.title}</h2>
          <p className="text-sm text-base-content/80 mb-1">
            <strong>Posted by:</strong> {event.name}
          </p>
          <p className="text-sm mb-1">
            <strong>Date:</strong> {format(new Date(event.date), 'PPP')} at {event.time}
          </p>
          <p className="text-sm mb-1">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-sm mb-2">{event.description.slice(0, 100)}...</p>
          <p className="text-sm font-medium mb-2">Attendees: {event.attendeeCount}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onJoin(event.id)}
            disabled={joined}
          >
            {joined ? 'Joined' : 'Join Event'}
          </button>

          <Link
            to={`/events/${event.id}`}
            className="btn btn-sm btn-outline btn-secondary"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
