import React from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaTools,
  FaProjectDiagram,
} from "react-icons/fa";
import { Link } from "react-router"; // Fixed router import

const About = () => {
  return (
    <section className="bg-base-200 text-base-content py-16 px-2 md:px-4 lg:px-8" id="about">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://i.ibb.co/h9wHCNc/event-team.jpg"
            alt="Our Event Team"
            className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Main Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-primary">About Us</h2>
          <p className="mb-6 text-base leading-relaxed">
            At <strong>EventCraft</strong>, we specialize in curating unforgettable experiences. Whether it's a wedding, corporate event, birthday, or concert — our team brings your vision to life with precision, creativity, and professionalism.
          </p>
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-3">
              <FaBuilding className="text-secondary" /> <strong>Company:</strong> EventCraft Ltd.
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-secondary" /> <strong>Location:</strong> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-3">
              <FaCalendarAlt className="text-secondary" /> <strong>Experience:</strong> 5+ Years in Event Management
            </li>
            <li className="flex items-center gap-3">
              <FaUsers className="text-secondary" /> <strong>Clients:</strong> 500+ Happy Customers
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Services/Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16"
      >
        <h3 className="text-2xl font-semibold mb-4 text-secondary flex items-center gap-2">
          <FaTools /> Services We Offer
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm font-medium">
          {[
            "Event Planning",
            "Venue Management",
            "Catering Services",
            "Live Entertainment",
            "Stage & Decor",
            "Photography",
            "Theme Events",
            "Corporate Seminars",
            "Wedding Coordination",
            "Guest Management",
            "Lighting & Sound",
            "Custom Invitations",
          ].map((service, index) => (
            <div
              key={index}
              className="bg-base-100 shadow rounded-xl px-4 py-2 text-center hover:scale-105 transition-transform duration-300 border border-base-300"
            >
              {service}
            </div>
          ))}
        </div>
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Link to="/services" className="btn btn-primary px-8 rounded-full mt-4">
            View All Services
          </Link>
        </motion.div>
      </motion.div>

      {/* Project Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-16"
      >
        <h3 className="text-2xl font-semibold mb-4 text-secondary flex items-center gap-2">
          <FaProjectDiagram /> Project Highlights
        </h3>
        <ul className="space-y-3 text-base list-disc pl-5">
          <li>Successfully managed 200+ events across Bangladesh.</li>
          <li>Handled VIP weddings with 1000+ guests, full production setup.</li>
          <li>Executed corporate conferences with live streaming & branding.</li>
          <li>Flexible team with creative designers, planners, and on-site managers.</li>
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 text-center"
      >
        <Link to="/projects" className="btn btn-primary px-8 rounded-full mt-4">
          Explore Our Work
        </Link>
      </motion.div>
    </section>
  );
};

export default About;
