import { useNavigate } from 'react-router-dom';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleUser {
    name: string;
    picture: string;
    email: string;
}

const GoogleAuth = () => {
    const navigate = useNavigate();

    const handleSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            const decoded: GoogleUser = jwtDecode(response.credential);
            localStorage.setItem('user', JSON.stringify(decoded));
            navigate('/home');
        }
    };

    const handleError = () => {
        console.error('Login Failed');
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
            <h1 style={{ marginBottom: '30px' }}>Welcome to Roomies</h1>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap={false}
                shape="pill"
            />
        </div>
    );
};

export default GoogleAuth;
