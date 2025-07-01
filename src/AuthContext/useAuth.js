// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);

  // Fetch current user on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/me', {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
  };

  return { user, logout };
}
