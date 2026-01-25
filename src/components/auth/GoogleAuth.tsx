import { useState, useEffect } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleUser {
    name: string;
    picture: string;
    email: string;
}

const GoogleAuth = () => {
    const [user, setUser] = useState<GoogleUser | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            const decoded: GoogleUser = jwtDecode(response.credential);

            setUser(decoded);
            localStorage.setItem('user', JSON.stringify(decoded));
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const handleError = () => {
        console.error('Login Failed');
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            {!user ? (
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    useOneTap={false}
                    shape="pill"
                />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <img
                        src={user.picture}
                        alt={user.name}
                        style={{ width: '64px', height: '64px', borderRadius: '50%' }}
                    />
                    <h2>שלום, {user.name}! 👋</h2>
                    <button onClick={handleLogout} style={{ cursor: 'pointer', padding: '5px 15px' }}>
                        התנתק
                    </button>
                </div>
            )}
        </div>
    );
};

export default GoogleAuth;