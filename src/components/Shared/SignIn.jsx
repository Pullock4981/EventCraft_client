import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // ✅ Add this line

const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');

    const handleSignin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (res.ok) {
                console.log('User logged in:', data.user);
                form.reset();

                // ✅ Show SweetAlert
                Swal.fire({
                    title: 'Success!',
                    text: 'Logged in successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                    timerProgressBar: true,
                }).then(() => {
                    navigate(location?.state?.from?.pathname || '/');
                });

            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            console.error('Login Error:', err);
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center py-10 bg-base-200">
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSignin} className="form-control w-full">
                        <h1 className="text-center font-bold mb-3 text-2xl">Login now!</h1>

                        <label className="label mb-1">Email</label>
                        <input type="email" className="input input-bordered" name="email" required />

                        <label className="label my-2">Password</label>
                        <input type="password" className="input input-bordered" name="password" required />

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        <button type="submit" className="btn bg-[#7C2808] text-white font-bold mt-4">
                            Log In
                        </button>

                        <p className="text-center mt-4">
                            New here?{' '}
                            <Link to="/register" className="text-blue-500 underline">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
