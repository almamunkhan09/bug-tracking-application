'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Logout() {
  const router = useRouter();

  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    return () => {
      if (!isLoggedOut) {
        axios
          .post(`http://localhost:3600/api/users/logout`, config)
          .then(() => {
            setIsLoggedOut(true);
          })
          .catch((error) => {
            console.error('Error:', error.message);
          });
      }
    };
  }, []);

  useEffect(() => {
    if (isLoggedOut) {
      return router.push('/login');
    }
  }, [isLoggedOut, router]);

  if (!isLoggedOut) {
    return <div>Logging out...</div>;
  }

  return <div>You have been logged out.</div>;
}

export default Logout;
