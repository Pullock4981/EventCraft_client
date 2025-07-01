

import { useState } from "react";
import { useAuth } from "../../AuthContext/useAuth";
import { Link, NavLink } from "react-router";
import Logo from "../Shared/Logo";
import ThemeToggle from "../Theme/ThemeToggle";
import PrivateRout from "../../Provider/PrivateRout";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    const menuItems = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold text-primary' : ''}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/events" className={({ isActive }) => isActive ? 'font-bold text-primary' : ''}>
                    Events
                </NavLink>
            </li>
            <li>
                <PrivateRout>
                    <NavLink to="/addEvent" className={({ isActive }) => isActive ? 'font-bold text-primary' : ''}>
                        Add Event
                    </NavLink>
                </PrivateRout>
            </li>
            <li>
                <PrivateRout>
                    <NavLink to="/myEvent" className={({ isActive }) => isActive ? 'font-bold text-primary' : ''}>
                        My Event
                    </NavLink>
                </PrivateRout>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
            {/* Mobile dropdown */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
                    <Logo className="h-6 w-6" />
                    <span className="font-bold">EventCraft</span>
                </Link>
            </div>

            {/* Desktop menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{menuItems}</ul>
            </div>

            {/* Right side */}
            <div className="navbar-end flex items-center gap-4">
                {!user ? (
                    <Link to="/signIn" className="btn btn-primary">
                        Sign In
                    </Link>
                ) : (
                    <div className="relative">
                        <img
                            src={user.photoURL}
                            alt={user.name}
                            className="w-8 h-8 rounded-full cursor-pointer border-2 border-base-300"
                            onClick={() => setOpen(o => !o)}
                        />
                        {open && (
                            <ul
                                className="absolute top-full right-0 mt-1 bg-base-100 border rounded-box shadow z-10 w-40"
                                tabIndex={0}
                            >
                                <li className="px-4 py-2">
                                    {user.name}
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 hover:bg-base-200 text-red-600"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                )}

            </div>
            <ThemeToggle />
        </div>
    );
}
