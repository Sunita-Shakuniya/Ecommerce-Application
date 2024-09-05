//forntend signup.jsx
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContexr';
import Loader from '../../components/loader/Loader';
import './login.css';
import { handleGoogleSignIn, handleSignUpWithEmail } from '../../utils/authutils';
function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, setLoading } = context;
     // Initialize Firebase
     

     const signupwithemail = async () => {
        setLoading(true);
        if (name === "" || email === "" || password === "") {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        await handleSignUpWithEmail(name, email, password, navigate, setLoading);  // Using the utility function
    };


    const handleGoogleSignInWrapper = async () => {
        setLoading(true);
        await handleGoogleSignIn(navigate, setLoading);
    };
    
    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className='bg-gray-800 px-10 py-10 rounded-xl' style={{ backgroundColor: '#042159' }}>
                <div className="">
                    <h1 className='text-center text-gray-300 text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-gray-800 placeholder:text-gray-400 outline-none'
                        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-gray-800 placeholder:text-gray-400 outline-none'
                        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-gray-800 placeholder:text-gray-400 outline-none'
                        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
                        placeholder='Password'
                    />
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={signupwithemail}
                        className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'
                        style={{ background: 'linear-gradient(to right, rgb(198, 0, 159), rgb(204, 0, 35))' }}
                    >
                        Signup
                    </button>
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        type="button"
                        className="login-with-google-btn"
                        onClick={handleGoogleSignInWrapper} disabled={loading}
                    >
                        Sign in with Google
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className='text-pink-600 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default Signup;
