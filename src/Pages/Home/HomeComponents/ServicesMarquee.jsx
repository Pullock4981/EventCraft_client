import React from 'react';
import Marquee from 'react-fast-marquee';

const ServicesMarquee = () => {
    return (
        <div className='flex md:flex-row flex-col justify-between items-center gap-6 bg-gradient-to-br from-blue-100 to-blue-50 p-3 px-5 rounded-md shadow-xl border border-purple-200'>
            <Marquee speed={40} gradient={false} direction='left' pauseOnHover className="text-base font-semibold text-purple-700 tracking-wide">
                🎉 Event Planning | 💍 Wedding Management | 🏢 Corporate Events | 🎤 Live Concerts | 🎈 Birthday Parties | 🌟 Stage & Decor | 🍽️ Catering Services | 🎬 Photography & Videography | 🚌 Guest Management | 🔊 Sound & Lighting | 🎯 Custom Theme Events | ✅ Hassle-Free Execution | 💡 Creative Concepts | 📞 24/7 Client Support
            </Marquee>
        </div>
    );
};

export default ServicesMarquee;
