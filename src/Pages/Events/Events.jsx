import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  format,
  isToday,
  isWithinInterval,
  subWeeks,
  startOfWeek,
  endOfWeek,
  subMonths,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import EventCard from './EventCard';

const fetchEvents = async () => {
  const res = await fetch('/events.json');
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
};

const Events = ({ currentUser }) => {
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [localEvents, setLocalEvents] = useState([]);

  // Add local "joinedUsers" and "attendeeCount" logic
  useEffect(() => {
    if (events.length) {
      setLocalEvents(events.map(e => ({ ...e })));
    }
  }, [events]);

  const filterAndSearchEvents = () => {
    let filtered = [...localEvents];

    // Filter
    const today = new Date();
    if (filter === 'today') {
      filtered = filtered.filter(e => isToday(new Date(e.date)));
    } else if (filter === 'thisWeek') {
      filtered = filtered.filter(e =>
        isWithinInterval(new Date(e.date), {
          start: startOfWeek(today),
          end: endOfWeek(today),
        })
      );
    } else if (filter === 'lastWeek') {
      const lastWeekStart = startOfWeek(subWeeks(today, 1));
      const lastWeekEnd = endOfWeek(subWeeks(today, 1));
      filtered = filtered.filter(e =>
        isWithinInterval(new Date(e.date), {
          start: lastWeekStart,
          end: lastWeekEnd,
        })
      );
    } else if (filter === 'thisMonth') {
      filtered = filtered.filter(e =>
        isWithinInterval(new Date(e.date), {
          start: startOfMonth(today),
          end: endOfMonth(today),
        })
      );
    } else if (filter === 'lastMonth') {
      const lastMonth = subMonths(today, 1);
      filtered = filtered.filter(e =>
        isWithinInterval(new Date(e.date), {
          start: startOfMonth(lastMonth),
          end: endOfMonth(lastMonth),
        })
      );
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (a.date !== b.date) return new Date(b.date) - new Date(a.date);
      return b.time.localeCompare(a.time);
    });
  };

  const handleJoin = (id) => {
    setLocalEvents(prev =>
      prev.map(e => {
        if (e.id === id && !e.joinedUsers.includes(currentUser.email)) {
          return {
            ...e,
            attendeeCount: e.attendeeCount + 1,
            joinedUsers: [...e.joinedUsers, currentUser.email],
          };
        }
        return e;
      })
    );
  };

  if (isLoading) return <div className="text-center py-10">Loading events...</div>;
  if (isError) return <div className="text-center text-red-500">Failed to load events.</div>;

  const displayedEvents = filterAndSearchEvents();

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">All Events</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="thisWeek">Current Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">Current Month</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>

      {/* Event Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {displayedEvents.map((event, i) => (


          <EventCard
            key={i}
            event={event}
          ></EventCard>

          // <motion.div
          //   key={e.id}
          //   className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl"
          //   initial={{ opacity: 0, y: 30 }}
          //   animate={{ opacity: 1, y: 0 }}
          //   transition={{ delay: i * 0.05 }}
          // >
          //   <h2 className="text-xl font-bold mb-2 text-primary">{e.title}</h2>
          //   <p className="text-sm text-base-content/80 mb-1"><strong>Posted by:</strong> {e.name}</p>
          //   <p className="text-sm mb-1"><strong>Date:</strong> {format(new Date(e.date), 'PPP')} at {e.time}</p>
          //   <p className="text-sm mb-1"><strong>Location:</strong> {e.location}</p>
          //   <p className="text-sm mb-3">{e.description}</p>
          //   <p className="text-sm mb-2"><strong>Attendees:</strong>


          //    {e.attendeeCount}</p>
          //   <button
          //     className="btn btn-primary btn-sm"
          //     disabled={e.joinedUsers.includes(currentUser.email)}
          //     onClick={() => handleJoin(e.id)}
          //   >
          //     {e.joinedUsers.includes(currentUser.email) ? "Joined" : "Join Event"}
          //   </button>
          // </motion.div>


        ))}


      </div>
    </section>
  );
};

export default Events;
