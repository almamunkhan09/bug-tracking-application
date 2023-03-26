'use client';
import { EnvelopeIcon, UserIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';

type PeopleType = {
  id: string;
  name: string;
  isAdmin: boolean;
  email: string;
  profilePicture: string;
  createdAt: Date;
}[];

export default function TeamComponent() {
  const [people1, setPeople1] = useState<PeopleType | null>(null);
  useEffect(() => {
    axios
      .get('http://localhost:3600/api/users/')
      .then((response) => {
        setPeople1(response.data);
        console.log(response.data);
        // Do something with the response data
      })
      .catch((error) => {
        console.log(error);
        // Handle the error in an appropriate way
      });
  }, []);
  if (!people1) return <div> Loading ....</div>;

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {people1.map((person) => (
        <li
          key={`personId-${person.id}`}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            {person.profilePicture ? (
              <img
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={person.profilePicture}
                alt=""
              />
            ) : (
              <div className="mx-auto h-32 w-32 flex-shrink-0 rounded-full">
                <UserIcon />
              </div>
            )}

            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {person.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              {/* <dt className="sr-only">Title</dt> */}
              <dd className="text-sm text-gray-500">
                {person.isAdmin ? 'Admin' : 'Developer'}
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Email
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
