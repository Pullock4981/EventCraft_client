import React, { useState, useEffect } from 'react';
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
  const res = await fetch('https://event-server-two-fawn.vercel.app/api/events', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
};

const Events = ({ currentUser }) => {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [localEvents, setLocalEvents] = useState([]);

  useEffect(() => {
    if (data.length) {
      const withDefaults = data.map((event) => ({
        ...event,
        attendeeCount: event.attendeeCount || 0,
        joinedUsers: event.joinedUsers || [],
      }));
      setLocalEvents(withDefaults);
    }
  }, [data]);

  const handleJoin = (id) => {
    setLocalEvents((prev) =>
      prev.map((event) =>
        event._id === id && !event.joinedUsers.includes(currentUser?.email)
          ? {
            ...event,
            attendeeCount: event.attendeeCount + 1,
            joinedUsers: [...event.joinedUsers, currentUser.email],
          }
          : event
      )
    );
  };

  const filterAndSearchEvents = () => {
    const today = new Date();
    let filtered = [...localEvents];

    switch (filter) {
      case 'today':
        filtered = filtered.filter((e) => isToday(new Date(e.date)));
        break;
      case 'thisWeek':
        filtered = filtered.filter((e) =>
          isWithinInterval(new Date(e.date), {
            start: startOfWeek(today),
            end: endOfWeek(today),
          })
        );
        break;
      case 'lastWeek':
        const lastWeekStart = startOfWeek(subWeeks(today, 1));
        const lastWeekEnd = endOfWeek(subWeeks(today, 1));
        filtered = filtered.filter((e) =>
          isWithinInterval(new Date(e.date), {
            start: lastWeekStart,
            end: lastWeekEnd,
          })
        );
        break;
      case 'thisMonth':
        filtered = filtered.filter((e) =>
          isWithinInterval(new Date(e.date), {
            start: startOfMonth(today),
            end: endOfMonth(today),
          })
        );
        break;
      case 'lastMonth':
        const lastMonth = subMonths(today, 1);
        filtered = filtered.filter((e) =>
          isWithinInterval(new Date(e.date), {
            start: startOfMonth(lastMonth),
            end: endOfMonth(lastMonth),
          })
        );
        break;
      default:
        break;
    }

    if (searchTerm) {
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      const dateDiff = new Date(b.date) - new Date(a.date);
      if (dateDiff !== 0) return dateDiff;
      return b.time.localeCompare(a.time);
    });
  };

  const displayedEvents = filterAndSearchEvents();

  if (isLoading) return <p className="text-center py-10">Loading events...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load events.</p>;

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">All Events</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <p>
          Search here:
        </p>
        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p>
          Sort here:
        </p>
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
        {displayedEvents.length ? (
          displayedEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              currentUser={currentUser}
              onJoin={handleJoin}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No events found.</p>
        )}
      </div>
    </section>
  );
};

export default Events;
