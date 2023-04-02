'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import uniqolor from 'uniqolor';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function twoWordName(name: string) {
  const nameArray: string[] = name.split(' ');

  return nameArray.length > 1
    ? `${nameArray[0][0]}${nameArray[nameArray.length - 1][0]}`
    : nameArray[0][0];
}

export default function StatCard() {
  const stringifiedUser = localStorage.getItem('user');
  const user = stringifiedUser && JSON.parse(stringifiedUser);
  const [projects, setProjects] = useState<any | null>(null);
  useEffect(() => {
    // setProjects(projects1);
    axios
      .get(`http://localhost:3600/api/users/${user.id}/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!projects) {
    return <div> </div>;
  }
  if (!projects.length) {
    return <h2 className="mt-5"> You are not Assosiated with any project</h2>;
  }
  return (
    <div className="mt-5">
      <h2 className="text-sm font-medium text-gray-500">Associated Projects</h2>
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {projects.map((project: any) => (
          <li
            key={`key-${project.id}`}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            <div
              style={{ backgroundColor: uniqolor.random().color }}
              className={classNames(
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
              )}
            >
              {twoWordName(project.title)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a
                  href={`/user/projects/${project.id}`}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {project.title}
                </a>
                <p className="text-gray-500">
                  {project.maintainers.length} Members
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
