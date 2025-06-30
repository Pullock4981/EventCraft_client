import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBirthdayCake,
  FaBuilding,
  FaMusic,
  FaUsers,
  FaHeart,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import { GiPartyPopper, GiPodium } from 'react-icons/gi';

const events = [
  {
    name: 'Weddings',
    icon: <FaHeart className="text-pink-400 text-5xl" />,
    description: 'Romantic and elegant wedding planning with personalized themes, decor, and coordination.',
  },
  {
    name: 'Corporate Events',
    icon: <FaBuilding className="text-blue-500 text-5xl" />,
    description: 'Professional and branded corporate events, conferences, and seminars handled end-to-end.',
  },
  {
    name: 'Birthday Parties',
    icon: <FaBirthdayCake className="text-yellow-500 text-5xl" />,
    description: 'Fun-filled birthday parties for all ages with decorations, activities, and catering.',
  },
  {
    name: 'Concerts & Shows',
    icon: <FaMusic className="text-purple-500 text-5xl" />,
    description: 'Live concerts, DJ nights, and entertainment events with lighting, sound, and security.',
  },
  {
    name: 'Community Gatherings',
    icon: <FaUsers className="text-green-500 text-5xl" />,
    description: 'Festivals, social awareness campaigns, or reunions – we help connect communities.',
  },
  {
    name: 'Workshops & Seminars',
    icon: <FaChalkboardTeacher className="text-indigo-500 text-5xl" />,
    description: 'Skill-based workshops and educational seminars with full logistical and attendee support.',
  },
  {
    name: 'Theme Parties',
    icon: <GiPartyPopper className="text-rose-400 text-5xl" />,
    description: 'Customized theme parties for kids, adults, or teams with creative decor and entertainment.',
  },
  {
    name: 'Award Ceremonies',
    icon: <GiPodium className="text-orange-500 text-5xl" />,
    description: 'Elegant award functions with stage design, audio visuals, and guest hosting services.',
  }
];

const Events = () => {
  return (
    <section className="bg-base-100 text-base-content py-16 px-4 md:px-8 lg:px-16 min-h-screen">
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Event Types We Manage
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="bg-base-200 p-6 rounded-2xl hover:bg-base-300 transition-all shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 80,
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              {event.icon}
              <h2 className="text-2xl font-semibold text-primary">
                {event.name}
              </h2>
            </div>
            <p className="text-sm text-base-content/80">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Events;
