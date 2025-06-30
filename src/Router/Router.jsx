import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import FAQ from "../Pages/FAQ";
import Home from "../Pages/Home/Home";
import Blogs from "../Pages/Blogs/Blogs";
import Projects from "../Pages/Services/Services.jsx";
import ProjectDetails from "../Pages/Services/ProjectDetails.jsx";
import About from "../Pages/About/About.jsx";
import ContactMe from "../Pages/Contact/ContactMe.jsx";
import Events from "../Pages/Events/Events.jsx";


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
            },
            {
                path: '/services',
                Component: Projects,
            },
            {
                path: '/reviews',
                Component: Blogs,
            },
            {
                path: "/serviceDetails/:id",
                Component: ProjectDetails,
            },
            {
                path: "/contactUs",
                Component: ContactMe,
            }
        ]
    }
])
