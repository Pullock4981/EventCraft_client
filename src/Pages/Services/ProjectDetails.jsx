import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";


const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetch('/projects.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p.id.toString() === id);
                setProject(found);
            });
    }, [id]);

    if (!project) return;


    // <div className="text-white text-center mt-10">Loading project...</div>;

    return (
        <div className="bg-base-100 max-w-7xl mx-auto mt-4 px-2 md:px-4 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">{project.title}</h1>
            <img src={project.image} alt={project.title} className="rounded-xl mb-6" />
            <p className="text-primary mb-4">{project.description}</p>

            <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
            <ul className="list-disc list-inside text-gray-400 mb-4">
                {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-gray-700 text-xs px-3 py-1 rounded">{tech}</span>
                ))}
            </div>

            <div className="flex gap-4">
                <a href={project.live} className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded">Live</a>
                <a href={project.githubC} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Client</a>
                <a href={project.githubS} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Server</a>
            </div>

            <div className="mt-6">
                <Link to="/projects" className="text-blue-400 underline hover:text-blue-300">← Back to Projects</Link>
            </div>
        </div>
    );
};

export default ProjectDetails;