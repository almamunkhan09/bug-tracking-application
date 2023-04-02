'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NewProjectForm from './NewProjectForm';

type Project = {
  id: string;
  title: string;
  description: string;
  maintainers: string[];
  deadline: string;
  lastUpdate: Date;
};

const formateDate = (date: Date): string => {
  const newDate = new Date(date);

  const formattedDate = `${newDate.getDate()}.${
    newDate.getMonth() + 1
  }.${newDate.getFullYear()}`;
  return formattedDate;
};

// const projects1 = [
//   {
//     id: 1,
//     title: 'Implement Graphql for the backend  ',
//     description:
//       'Graphql need to implement with the system  fasdfgsdgsdfgsdfgsdgsdfgdgfhdfhsdfghdg',
//     maintainers: [
//       { id: '1', name: 'Al Mamun Khan' },
//       { id: '2', name: 'Majharul Islam' },
//       { id: '3', name: 'shayan haider' },
//     ],
//     deadline: '22.02.2023',
//     lastUpdate: '22.01.2023',
//   },
//   {
//     id: 2,
//     title: 'Implement Graphql for the backend ',
//     description:
//       'Graphql need to implement with the system  fasdfgsdgsdfgsdfgsdgsdfgdgfhdfhsdfghdg',
//     maintainers: [
//       { id: '1', name: 'Al Mamun Khan' },
//       { id: '2', name: 'Majharul Islam' },
//     ],
//     deadline: '22.02.2023',
//     lastUpdate: '22.01.2023',
//   },
//   // More projects...
// ];

function nameFromArray(maintainers: { id: string; name: string }[]) {
  const onlyNames = maintainers.map((maintainer) => maintainer.name);
  return onlyNames.join(',');
}

export default function ProjectTable() {
  const stringifiedUser = localStorage.getItem('user');
  const user = stringifiedUser && JSON.parse(stringifiedUser);
  console.log(user.id);
  const [open, setOpen] = useState(false);
  const [change,setChange] = useState<boolean>(false)
  const [projects, setProjects] = useState<any | null>(null);
  useEffect(() => {
    // setProjects(projects1);
    axios
      .get(`http://localhost:3600/api/users/${user.id}/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, [change]);
  if (!projects) {
    return <div> Loading ...</div>;
  }
  if (!projects.length) {
    return <h2> You are not Assosiated with any project</h2>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Projects
          </h1>
          {/* <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p> */}
        </div>
        {!user.isAdmin ? (
          ''
        ) : (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setOpen(true)}
            >
              New
            </button>
            <NewProjectForm open={open} setOpen={setOpen} change={change} setChange={setChange}/>
          </div>
        )}
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full  table-auto  divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Maintainers
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Deadline
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Last Update
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* @ts-ignore */}
                {projects.map((project) => (
                  <tr key={`key-${project.id}`}>
                    <td className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 ">
                      <Link href={`user//projects/${project.id}`}>
                        {project.title}
                      </Link>
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500 ">
                      {project.description}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {nameFromArray(project.maintainers)}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {project.deadline ? project.deadline : '....'}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {formateDate(project.updatedAt)}
                    </td>
                    <td className="relative  py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href={`/user/projects/${project.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Details
                        <span className="sr-only">, {project.title}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
