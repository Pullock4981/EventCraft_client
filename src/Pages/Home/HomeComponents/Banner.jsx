import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaCalendarCheck, FaPhoneAlt } from "react-icons/fa";
import ServicesMarquee from "./ServicesMarquee";

const Banner = () => {
  return (
    <div className="bg-base-200 rounded-2xl">
      <div className="relative z-10 w-full max-w-6xl p-6 md:p-10 text-neutral-content text-center">
        <Fade direction="down" triggerOnce>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
            Welcome to EventCraft
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your trusted partner in crafting unforgettable events – from intimate gatherings to grand celebrations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button className="btn btn-primary text-white">
              <FaCalendarCheck className="mr-2" /> Book an Event
            </button>
            <button className="btn btn-outline btn-accent">
              <FaPhoneAlt className="mr-2" /> Contact Us
            </button>
          </div>
        </Fade>

        <Fade direction="up" triggerOnce>
          <div className="bg-base-100 bg-opacity-90 rounded-xl p-6 md:p-8 text-base-content text-left max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center border-b-2 border-purple-400 pb-2">
              Why Choose EventCraft?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg">
              <li className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">
                Tailor-made events to match your unique vision
              </li>
              <li className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">
                Full-service planning: Venue, Decor, Catering, Entertainment & More
              </li>
              <li className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">
                Experienced team with 500+ successful events
              </li>
              <li className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">
                Seamless experience from concept to celebration
              </li>
            </ul>
          </div>
        </Fade>
      </div>

      <section className="shadow-md px-2 md:px-4 lg:px-8 pb-4">
        <ServicesMarquee></ServicesMarquee>
      </section>

    </div>
  );
};

export default Banner;
