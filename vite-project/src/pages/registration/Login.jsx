import Loader from '../../components/loader/Loader';
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { initializeFirebase } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import { useContext, useState, useEffect } from 'react';
import myContext from '../../context/data/myContexr';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './login.css';
import Layout from '../../components/layout/Layout';
import { handleGoogleSignIn } from '../../utils/authutils';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(null);
    const [googleProvider, setGoogleProvider] = useState(null);
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    useEffect(() => {
        const initialize = async () => {
            const { auth: firebaseAuth, googleProvider: firebaseGoogleProvider } = await initializeFirebase();
            setAuth(firebaseAuth);
            setGoogleProvider(firebaseGoogleProvider);
        };
        initialize();
    }, []);

    const signin = async () => {
        if (!auth) return; // Ensure auth is initialized
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', JSON.stringify(result));
            toast.success('Signin Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/');
            setLoading(false);
        } catch (error) {
            toast.error('Signin Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
        }
    };

    const forgotPassword = async () => {
        if (!email) {
            toast.error('Please enter your email address', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (!auth) return; // Ensure auth is initialized
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            toast.error('Failed to send password reset email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        setLoading(false);
    };
    const handleGoogleSignInWrapper = async () => {
        setLoading(true);
        await handleGoogleSignIn(navigate, setLoading);
    };

    return (
        <Layout>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                <div className='bg-gray-800 px-10 py-10 rounded-xl' style={{ backgroundColor: '#042159' }}>
                    <div className="">
                        <h1 className='text-center text-gray-300 text-xl mb-4 font-bold'>Login</h1>
                    </div>
                    <div>
                        <input type="email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onClick={signin}
                            className='w-full text-white font-bold px-2 py-2 rounded-lg'
                            style={{ background: 'linear-gradient(to right,rgb(198, 0, 159), rgb(204 0 35))' }}
                        >
                            Login
                        </button>
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button type="button" className="login-with-google-btn" onClick={handleGoogleSignInWrapper} disabled={loading}>
                            Sign in with Google
                        </button>
                    </div>
                    <div>
                        <h2 className='text-white'>Don't have an account?
                            <Link className='text-pink-600 font-bold' style={{ color: 'linear-gradient(to right,rgb(198, 0, 159), rgb(204 0 35))' }} to={'/signup'}> Signup</Link>
                        </h2>
                        <button onClick={forgotPassword} className='text-yellow-300 font-bold'>
                            Forgot Password?
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
