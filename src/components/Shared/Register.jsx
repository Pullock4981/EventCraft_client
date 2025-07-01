// import React, { useState } from 'react';
// import { Link } from 'react-router';
// import Swal from 'sweetalert2';

// const Register = () => {
//     const [errorMessage, setErrorMessage] = useState("");
//     // const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const formData = new FormData(form);
//         const { email, password, ...rest } = Object.fromEntries(formData.entries());

//         const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
//         if (!passwordPattern.test(password)) {
//             setErrorMessage("Password must have one uppercase, one lowercase & be at least 6 characters.");
//             return;
//         }
//         setErrorMessage("");

//         const userInfo = { email, ...rest };
//         console.log(userInfo)

//     };

//     return (
//         <div className="flex justify-center items-center py-10 bg-base-200 ">
//             <div className="card bg-base-100 w-full md:mx-60 mx-4 shadow-2xl">
//                 <div className="card-body">
//                     <form onSubmit={handleSubmit} className="form-control w-full">
//                         <h1 className="text-xl md:text-3xl text-center mb-3 font-bold">Please Register</h1>

//                         <div className="flex flex-col gap-4">
//                             <div className="flex justify-between flex-col md:flex-row gap-4">
//                                 <label className="label text-inherit">Name</label>
//                                 <input type="text" className="input input-bordered" name="name" placeholder="Your Name" required />

//                                 <label className="label text-inherit">Photo URL</label>
//                                 <input type="text" className="input input-bordered" name="photoURL" placeholder="Photo URL" required />

//                             </div>
//                             <div className="flex justify-between flex-col md:flex-row gap-4">
//                                 <label className="label text-inherit">Email</label>
//                                 <input type="email" className="input input-bordered" name="email" placeholder="Email" required />

//                                 <label className="label text-inherit">Password</label>
//                                 <input type="password" className="input input-bordered mb-2" name="password" placeholder="Password" required />

//                             </div>
//                         </div>
//                         {/* {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>} */}

//                         <button
//                             type="submit"
//                             className="btn btn-block font-bold mb-2 "
//                             style={{ backgroundColor: "#6c8da7", color: "#fff" }}
//                         >
//                             Register
//                         </button>

//                         <p className="text-center">
//                             Already have an account?{" "}
//                             <Link
//                                 to="/signIn"
//                                 className="link link-hover underline font-semibold text-secondary"

//                             >
//                                 Log in
//                             </Link>
//                         </p>
//                     </form>

//                     {/* Google Sign In */}
//                     <button
//                         // onClick={handleSignInWithGoogle}
//                         className="btn btn-outline mt-4"
//                         style={{ color: "#040506", borderColor: "#b98db3", backgroundColor: "#fff" }}
//                     >
//                         <svg aria-label="Google logo" width="16" height="16" viewBox="0 0 512 512" className="inline mr-2">
//                             <path fill="#EA4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
//                             <path fill="#FBBC05" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
//                             <path fill="#34A853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
//                             <path fill="#4285F4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
//                         </svg>
//                         <span className="ml-2">Sign up with Google</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
// import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const { name, email, password, photoURL } = Object.fromEntries(formData.entries());

        // Basic password validation
        // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        // if (!passwordPattern.test(password)) {
        //     setErrorMessage('Password must have one uppercase, one lowercase & be at least 6 characters.');
        //     return;
        // }

        try {
            // const response = await fetch('/api/auth/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email, password, photoURL })
            // });
            const response = await fetch("https://event-server-two-fawn.vercel.app/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, photoURL })
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Registered:", data);
                    // maybe redirect to login page
                })
                .catch(err => console.error(err));



            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Registration failed');
            }

            // Optionally store user/token
            localStorage.setItem('user', JSON.stringify(result.user));
            navigate('/'); // Redirect to homepage or dashboard
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center py-10 bg-base-200">
            <div className="card w-full md:mx-60 mx-4 shadow-2xl border">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="form-control w-full">
                        <h1 className="text-3xl text-center font-bold mb-4">Please Register</h1>

                        <div className=' flex flex-col'>
                            <input type="text" name="name" placeholder="Name" className="input w-full input-bordered mb-2" required />
                            <input type="text" name="photoURL" placeholder="Photo URL" className="input w-full input-bordered mb-2" required />
                            <input type="email" name="email" placeholder="Email" className="input w-full input-bordered mb-2" required />
                            <input type="password" name="password" placeholder="Password" className="input w-full input-bordered mb-2" required />
                        </div>

                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                        <button type="submit" className="btn bg-[#7C2808] text-white font-bold">Register</button>

                        <p className="text-center mt-2">
                            Already have an account?{" "}
                            <Link to="/signIn" className="text-blue-500 underline">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
