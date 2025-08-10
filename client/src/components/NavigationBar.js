import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const linkStyle = (active) => ({
  marginRight: 16,
  textDecoration: 'none',
  fontWeight: active ? '600' : '400',
  color: active ? '#1976d2' : '#444'
});

const NavigationBar = () => {
  const { user, logout, token } = useAuth();
  const location = useLocation();
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      borderBottom: '1px solid #eee',
      background: '#fafafa'
    }}>
      <div style={{ flexGrow: 1 }}>
        <Link to="/" style={linkStyle(location.pathname === '/')}>Dashboard</Link>
        {token && <Link to="/test" style={linkStyle(location.pathname === '/test')}>Test DB</Link>}
        {!token && <Link to="/login" style={linkStyle(location.pathname === '/login')}>Login</Link>}
      </div>
      <div style={{ fontSize: 14, color: '#555' }}>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>Signed in as {user.email} ({user.role})</span>
            <button onClick={logout} style={{ cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <span>Not signed in</span>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
