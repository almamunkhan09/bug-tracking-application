'use client';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function StatCardIssues() {
  const stringifiedUser = localStorage.getItem('user');
  const user = stringifiedUser && JSON.parse(stringifiedUser);
  const [issues, setIssues] = useState<any | null>(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3600/api/users/${user.id}/relatedissues`)
      .then((res) => setIssues(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!issues) {
    return <div> </div>;
  }
  if (!issues.length) {
    return <h2> You are not Assosiated with any project</h2>;
  }
  return (
    <div className="mt-10">
      <h2 className="text-sm font-medium text-gray-500"> Issues at a Glance</h2>
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {issues.map((issue: any) => (
          <li
            key={`key-${issue.id}`}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            <div className="flex flex-1 items-center justify-between truncate rounded border border-gray-200 bg-white mt-5">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a
                  href={`/user/issues/${issue.id}`}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {issue.title}
                </a>
                <p className="text-gray-500 truncate mt-2">
                  {issue.description}
                </p>
                <p className="text-gray-700 mt-2">
                  {issue.assignees.length} person assigned
                </p>

                <div className="mt-10  flex flex-1 items-center justify-between">
                  {issue.status.toLowerCase() === 'open' ? (
                    <div className="flex items-center space-x-2">
                      <LockOpenIcon
                        className="h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 ">
                      <LockClosedIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-900 mx-5">
                    {issue.priority}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
