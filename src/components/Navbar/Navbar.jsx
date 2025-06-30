import { Link, NavLink } from 'react-router';
import ThemeToggle from '../Theme/ThemeToggle';
import Logo from '../Shared/logo';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FiArrowRightCircle } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import { RiArrowRightSLine } from 'react-icons/ri';

const Navbar = () => {




    const links = (
        <>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-base-content font-bold" : "font-bold"}>Home</NavLink>

            <NavLink to="/about" className={({ isActive }) => isActive ? "text-base-content font-bold" : "font-bold"}>About Us</NavLink>

            <NavLink to="/events" className={({ isActive }) => isActive ? "text-base-content font-bold" : "font-bold"}>Events</NavLink>

            <NavLink to="/services" className={({ isActive }) => isActive ? "text-base-content font-bold" : "font-bold"}>Services</NavLink>

            <NavLink to="/reviews" className={({ isActive }) => isActive ? "text-base-content font-bold" : "font-bold"}>Reviews</NavLink>
            
            <NavLink to="/contactUs" className={({ isActive }) => isActive ? "text-base-content font-bold" : "font-bold"}>Contact Us</NavLink>
        </>
    );


    return (
        <div className="bg-base-300 shadow-md px-2 md:px-4 lg:px-8 py-2 sticky top-0 z-50">
            <div className="navbar max-w-7xl mx-auto px-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-base-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 shadow-lg bg-base-200 rounded-lg w-52 text-gray-500 space-y-1 z-50"
                        >
                            {links}
                        </ul>
                    </div>

                    <div className='w-24 hidden lg:flex items-center'>
                        <Logo></Logo>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-5 text-gray-500 font-medium">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end gap-3">
                    <Link to='/' className="btn btn-secondary btn-lg rounded-full px-8 font-semibold text-secondary-content
                 hover:btn-primary transition-colors duration-300 shadow-lg
                 transform hover:-translate-y-1 hover:text-primary-content">
                        Hire Me
                        {/* <HiArrowNarrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" /> */}
                        {/* <FiArrowRightCircle className="text-2xl transition-transform duration-300 hover:rotate-12" /> */}
                        <FaArrowRight className="text-lg transition-transform duration-300 hover:translate-x-1.5 hover:scale-110" />
                    </Link>
                    {/* <RiArrowRightSLine className="text-2xl transition-all duration-300 hover:translate-x-2" /> */}


                    <ThemeToggle />
                </div>
            </div>
        </div>


    );
};

export default Navbar;