import { useNavigate } from 'react-router-dom';

interface GoogleUser {
    name: string;
    picture: string;
    email: string;
}

const HomeScreen = () => {
    const navigate = useNavigate();
    const savedUser = localStorage.getItem('user');
    const user: GoogleUser | null = savedUser ? JSON.parse(savedUser) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <img
                src={user.picture}
                alt={user.name}
                style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #646cff' }}
            />
            <h1>ברוך הבא, {user.name}! 👋</h1>
            <p>שמחים לראות אותך ב-Roomies</p>
            <button
                onClick={handleLogout}
                style={{
                    cursor: 'pointer',
                    padding: '10px 20px',
                    backgroundColor: '#ff4757',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
            >
                התנתק
            </button>
        </div>
    );
};

export default HomeScreen;
