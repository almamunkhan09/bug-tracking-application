'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  profilePicture: string;
  isAdmin: boolean;
};

axios.defaults.withCredentials = true;

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);

  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3600/api/users/singleuser`, config)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }, []);

  return <div> {user && <h1>{user.name}</h1>}</div>;
}
