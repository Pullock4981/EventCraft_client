import React from 'react';
import SkillsMarquee from './HomeComponents/ServicesMarquee';
import Banner from './HomeComponents/Banner';
import HomeHighlights from './HomeComponents/HomeHighlights';

const Home = () => {

    return (
        <div className=" mx-auto">

            {/* <h1>home</h1> */}
            <section className="bg-base-300 shadow-md px-2  md:px-4 lg:px-8 py-10">
                <Banner></Banner>
            </section>

            <section className="bg-base-300 shadow-md px-2 md:px-4 lg:px-8 pb-10">
                <HomeHighlights></HomeHighlights>
            </section>

            {/* <section className="bg-base-300 shadow-md px-2 md:px-4 lg:px-8 py-2">
                <h1>Banner 1</h1>
            </section>

            <section className="bg-base-100 shadow-md px-2 md:px-4 lg:px-8 py-2">
                <h1>Banner 2</h1>
            </section>
            <section className="bg-base-200 shadow-md px-2 md:px-4 lg:px-8 py-2">
                <h1>Banner 3</h1>
            </section>
            <section className="bg-base-content shadow-md px-2 md:px-4 lg:px-8 py-2">
                <h1 className='text-primary'>Banner 3</h1>
            </section>
            <section className="bg-base-300 shadow-md px-2 md:px-4 lg:px-8 py-2">
                <h1>Banner 4</h1>
            </section>

            <section className="px-2 md:px-4 lg:px-8 py-2">
                <SkillsMarquee></SkillsMarquee>
            </section>
 */}






            {/* <HobbyAwesomeReveal /> */}
            {/* <TypewriterComponent></TypewriterComponent> */}
            {/* <GroupCarousel></GroupCarousel> */}

        </div>



    );
};

export default Home;