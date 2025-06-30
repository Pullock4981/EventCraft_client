import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Blogs from "../Pages/Blogs/Blogs";
import About from "../Pages/About/About.jsx";
import ContactMe from "../Pages/Contact/ContactMe.jsx";
import Events from "../Pages/Events/Events.jsx";
import EventDetails from "../Pages/Events/EventDetails.jsx";
import Services from "../Pages/Services/Services.jsx";


export const Router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: '/',
                Component: Home,
                // loader: async () => {
                //     const res = await fetch('https://bd-food-storage-server.vercel.app/fridge');
                //     return res.json();
                // },
                // hydrateFallbackElement: <h1>Loading...</h1>,
            },
            {
                path: '/about',
                Component: About,
            },
            {
                path: '/events',
                Component: Events,
            }, {
                path: '/events/:id',
                Component: Events,
            },
            {
                path: '/services',
                Component: Services,
            },
            {
                path: '/reviews',
                Component: Blogs,
            },
            {
                path: "/serviceDetails/:id",
                Component: EventDetails,
            },
            {
                path: "/contactUs",
                Component: ContactMe,
            }
        ]
    }
])
