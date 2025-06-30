import React from "react";
import { motion } from "framer-motion";
import { FaBirthdayCake, FaUsers, FaMicrophoneAlt, FaUtensils, FaCamera, FaPaintBrush } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router"; // fixed incorrect import

const highlights = [
  {
    icon: <FaBirthdayCake className="text-4xl text-primary" />,
    title: "Event Planning",
    desc: "From birthdays to corporate galas – we plan, manage, and deliver unforgettable experiences.",
  },
  {
    icon: <FaUsers className="text-4xl text-secondary" />,
    title: "Guest Management",
    desc: "We take care of invitations, RSVPs, and smooth coordination on the big day.",
  },
  {
    icon: <FaMicrophoneAlt className="text-4xl text-accent" />,
    title: "Stage & Entertainment",
    desc: "Professional sound, lighting, and live performances to keep your guests engaged.",
  },
  {
    icon: <FaUtensils className="text-4xl text-warning" />,
    title: "Catering Services",
    desc: "Delicious, customizable catering options for all events and dietary needs.",
  },
  {
    icon: <FaCamera className="text-4xl text-info" />,
    title: "Photography & Videography",
    desc: "Capture every special moment with our professional photo & video team.",
  },
  {
    icon: <FaPaintBrush className="text-4xl text-success" />,
    title: "Theme & Decor",
    desc: "Personalized styling and decor to bring your event vision to life.",
  },
];

const HomeHighlights = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section className="py-16 px-4 md:px-8 bg-base-200 text-base-content rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" ref={ref}>
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              className="bg-base-100 rounded-xl p-6 shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-base-content/80">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link to="/services" className="btn btn-primary px-8 rounded-full mt-4">
            Explore All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHighlights;
