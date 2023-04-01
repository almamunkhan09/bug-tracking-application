'use client';
import {
  BugAntIcon,
  CalendarIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { ClockIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NewIssue from '../../issues/NewIssue';

type Project = {
  id: string;
  title: string;
  description: string;
  createdById: string;
  maintainerIds: string[];
  issuesIds: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    profilePicture: string | null;
    email: string;
  };
  maintainers: {
    id: string;
    name: string;
    profilePicture: string | null;
    email: string;
  }[];

  issues: [
    {
      id: string;
      title: string;
      reporter: {
        id: string;
        name: string;
      };
      status: 'open';
      priority: 'low';
    },
  ];
  message: 'Get the project Successfully';
};

interface ProjectId {
  projectId: string;
}

export default function SingleProject({ projectId }: ProjectId) {
  const [project, setProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3600/api/projects/${projectId}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!project) {
    return <div> Loading ...</div>;
  }
  return (
    <div>
      <main className="flex-1">
        <div>
          <div className="mx-auto  px-4 sm:px-6 lg:px-8 xl:grid  xl:grid-cols-3">
            <div className="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
              <div>
                <div>
                  <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {project.title}
                      </h1>
                      <p className="mt-2 text-sm text-gray-500">
                        #{project.id} || Owned by{' '}
                        <b> {project.createdBy.name} </b>
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-3 md:mt-0">
                      <button
                        type="button"
                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <PencilIcon
                          className="-ml-0.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpen((preValue) => !preValue)}
                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <BugAntIcon
                          className="-ml-0.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        New Issue
                      </button>
                      <NewIssue
                        open={open}
                        setOpen={setOpen}
                        projectId={projectId}
                      />
                    </div>
                  </div>
                  <aside className="mt-8 xl:hidden">
                    <h2 className="sr-only">Details</h2>
                    <div className="space-y-5">
                      <div className="flex items-center space-x-2">
                        <ClockIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-green-700">
                          Deadline{' '}
                          <time>
                            {/* @ts-ignore */}
                            {project.deadline
                              ? new Date(project.deadline).toDateString()
                              : '...'}
                          </time>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <BugAntIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {project.issues.length} Issues
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          Created on{' '}
                          <time>
                            {' '}
                            {new Date(project.createdAt).toDateString()}
                          </time>
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 space-y-8 border-t border-gray-200 py-6">
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">
                          Members
                        </h2>
                        <ul className="mt-3 space-y-3">
                          {project.maintainers.map((maintainer) => {
                            return (
                              <li
                                key={`key-${maintainer.id}`}
                                className="flex justify-start"
                              >
                                <div className="flex-shrink-0">
                                  {maintainer.profilePicture ? (
                                    <img
                                      className="h-5 w-5 rounded-full"
                                      src={maintainer.profilePicture}
                                      alt={maintainer.name}
                                    />
                                  ) : (
                                    <div className="h-5 w-5 rounded-full">
                                      <UserCircleIcon />{' '}
                                    </div>
                                  )}
                                </div>
                                <div className="text-sm font-medium text-gray-900 ml-2">
                                  {maintainer.name}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </aside>
                  <div className="py-3 xl:pt-6 xl:pb-0">
                    <h2 className="sr-only">Description</h2>
                    <div className="prose max-w-none">
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Comments*/}

              <section aria-labelledby="notes-title ">
                <div className="bg-white  sm:overflow-hidden sm:rounded-lg mt-10">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Issues
                      </h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <div className="overflow-x-auto">
                        <table className="table w-full">
                          {/* head */}
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Repoted By</th>
                              <th>Status</th>
                              <th> Priority</th>
                            </tr>
                          </thead>
                          <tbody>
                            {project.issues.map((issue) => {
                              return (
                                <tr key={`key-${issue.id}`} className="hover">
                                  <th>
                                    {' '}
                                    <Link href={`/user/issues/${issue.id}`}>
                                      {' '}
                                      {issue.title}{' '}
                                    </Link>
                                  </th>
                                  <td>{issue.reporter.name}</td>
                                  <td>{issue.status}</td>
                                  <td>{issue.priority}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <aside className="hidden xl:block xl:pl-8">
              <h2 className="sr-only">Details</h2>
              <div className="space-y-5">
                <div className="flex items-center space-x-2">
                  <ClockIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-green-700">
                    Deadline{' '}
                    <time>
                      {/* @ts-ignore */}
                      {project.deadline
                        ? new Date(project.deadline).toDateString()
                        : '...'}
                    </time>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <BugAntIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {project.issues.length} Issues
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Created on{' '}
                    <time> {new Date(project.createdAt).toDateString()}</time>
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-8 border-t border-gray-200 py-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Members</h2>
                  <ul className="mt-3 space-y-3">
                    {project.maintainers.map((maintainer) => {
                      return (
                        <li
                          key={`key-${maintainer.id}`}
                          className="flex justify-start"
                        >
                          <div className="flex-shrink-0">
                            {maintainer.profilePicture ? (
                              <img
                                className="h-5 w-5 rounded-full"
                                src={maintainer.profilePicture}
                                alt={maintainer.name}
                              />
                            ) : (
                              <div className="h-5 w-5 rounded-full">
                                <UserCircleIcon />{' '}
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-medium text-gray-900 ml-2">
                            {maintainer.name}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
