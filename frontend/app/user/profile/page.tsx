'use client';
import { UserIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import EditProfileForm from './EditProfileForm';

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
  profilePicture: string;
};

// const user = {
//   id: '1',
//   name: 'Al Mamun khan',
//   isAdmin: true,
//   profilePicture:
//     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//   email: 'almamunkhan09@gmail.com',
//   ceartedAt: '2017-01-05T20:35:40',
// };

function Page() {
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const stringifiedUser = localStorage.getItem('user');
    const userInfo = stringifiedUser && JSON.parse(stringifiedUser);
    setUser(userInfo);
  }, []);
  if (!user) return <h2> Loading ...</h2>;
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl h-full">
        <figure>
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="Album" />
          ) : (
            <UserIcon />
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title"> {user.name}</h2>
          <h3> {user.isAdmin ? 'Admin' : 'Developer'}</h3>

          <h3> {user.email}</h3>

          <p className="text-sm text-slate-500 sm:col-span-6">
            This account was created on{' '}
            <time dateTime={user.createdAt}>
              {new Date(user.createdAt).toDateString()}
            </time>
            .
          </p>
          {!editOpen ? (
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => setEditOpen(true)}
              >
                Edit
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {editOpen ? <EditProfileForm setEditOpen={setEditOpen} /> : ''}
    </>
  );
}

export default Page;
