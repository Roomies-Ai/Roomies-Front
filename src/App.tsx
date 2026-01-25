import { motion } from 'framer-motion';
import { Layout, Server, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import apiClient from './api/client';

function App() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    // Simple health check to the Nest.js backend
    apiClient.get('/')
      .then(() => setBackendStatus('online'))
      .catch(() => setBackendStatus('offline'));
  }, []);

  return (
    <div className="app-container" style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ fontSize: '4rem', margin: '0', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Roomies
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
            Elevate your co-living experience.
          </p>
        </motion.div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <FeatureCard
          icon={<Layout size={24} />}
          title="React Frontend"
          description="Powered by Vite and TypeScript for ultimate speed and reliability."
          delay={0.1}
        />
        <FeatureCard
          icon={<Server size={24} />}
          title="Nest.js Integrated"
          description="Seamlessly connected to your robust backend architecture."
          status={backendStatus}
          delay={0.2}
        />
        <FeatureCard
          icon={<Users size={24} />}
          title="Colliving Tools"
          description="Manage chores, bills, and schedules with ease."
          delay={0.3}
        />
      </main>

      <footer style={{ marginTop: 'auto', paddingTop: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>&copy; 2026 Roomies App. Built with Passion & Precision.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay, status }: { icon: React.ReactNode, title: string, description: string, delay: number, status?: string }) {
  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'default' }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: 'rgba(99, 102, 241, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary)'
      }}>
        {icon}
      </div>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
        {description}
      </p>
      {status && (
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: status === 'online' ? '#10b981' : (status === 'offline' ? '#ef4444' : '#f59e0b')
          }} />
          <span style={{ textTransform: 'capitalize' }}>Backend {status}</span>
        </div>
      )}
    </motion.div>
  );
}

export default App;
