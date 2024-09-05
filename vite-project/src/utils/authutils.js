// src/utils/authUtils.js
import { toast } from 'react-toastify';
import { signInWithGoogle, initializeFirebase } from '../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

export const handleGoogleSignIn = async (navigate, setLoading) => {
    try {
        await initializeFirebase();
        const result = await signInWithGoogle();
        if (result) {
            const { user, idtoken } = result;
            console.log('User:', user);
            console.log('ID Token:', idtoken);

            const response = await fetch('http://localhost:5000/api/auth/google-signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idtoken}`,
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                console.log('Response error details:', response);
                throw new Error('Google Sign-In failed');
            }

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            toast.success('Signed in with Google successfully');
            navigate('/');
        } else {
            toast.error('Google Sign-In failed');
        }
    } catch (error) {
        console.error('Google Sign-In error:', error);
        toast.error(`Google Sign-In failed: ${error.message}`);
    } finally {
        if (typeof setLoading === 'function') {
            setLoading(false);  // Ensure this line is executed
        }
    }
};

export const handleSignUpWithEmail = async (name, email, password, navigate, setLoading) => {
    try {
        await initializeFirebase();

        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, uid }),
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Signup failed');
        }

        const data = await response.json();
        toast.success("Signup Successful");
        navigate('/');  // Redirecting after signup

    } catch (error) {
        console.error('Signup error:', error);
        toast.error(`Signup failed: ${error.message}`);
    } finally {
        setLoading(false);
    }
};