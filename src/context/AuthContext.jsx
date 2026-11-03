import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('freelanser_session');
    if (saved) {
      const session = JSON.parse(saved);
      setUser(session.user);
      setRole(session.role);
    }
  }, []);

  const login = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
    sessionStorage.setItem(
      'freelanser_session',
      JSON.stringify({ user: userData, role: userRole })
    );
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    sessionStorage.removeItem('freelanser_session');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
