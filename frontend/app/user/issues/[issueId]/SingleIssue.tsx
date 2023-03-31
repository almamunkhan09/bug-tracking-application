'use client';
import {
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type Issue = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  reporterId: string;
  assigneeIds: string[];
  relatedProjectId: string;
  commentsIds: [];
  createdAt: string;
  updatedAt: string;
  reporter: {
    name: string;
    id: string;
  };
  assignees?: {
    name: string;
    id: string;
    profilePicture: string;
  }[];
  relatedProject: {
    id: string;
    title: string;
  };
  comments?: {
    id: string;
    content: string;
    commentedBy: {
      name: string;
      id: string;
      profilePicture: string;
    };
    createdAt: string;
    updatedAt: string;
  }[];
};

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
  profilePicture: string;
  email: string;
};

function daysdiff(inputDate: string) {
  const date = new Date(inputDate);
  const timeDiff = Math.abs(new Date(Date.now()).getTime() - date.getTime());
  return Math.floor(timeDiff / (1000 * 60 * 60 * 20));
}

interface IssueId {
  issueId: string;
}
const schema = yup.object().shape({
  content: yup.string().required(),
  description: yup.string().required(),
  // maintainer: yup.array().of(yup.string()).required(),
  deadline: yup.date().required(),
});

type Inputs = {
  content: string;
};

function SingleIssue({ issueId }: IssueId) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const [issue, setIssue] = useState<Issue | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stringifiedUser = localStorage.getItem('user');
    const userInfo = stringifiedUser && JSON.parse(stringifiedUser);
    setUser(userInfo);
    axios
      .get(`http://localhost:3600/api/issues/${issueId}`)
      .then((res) => {
        setIssue(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  // const onSubmit: SubmitHandler<Content> = (data) => {
  //   const requestData = {
  //     content: data.content,
  //     issueId,
  //     commentedBy: user?.id,
  //   };
  //   console.log(data);
  //   console.log('requested data', requestData);
  //   reset();
  // };
  if (!issue) return <div> Loading ...</div>;
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
                        {issue.title}
                      </h1>
                      <p className="mt-2 text-sm text-gray-500">
                        #{issue.id} opened by {issue.reporter.name} in{' '}
                        <Link
                          href={`/user/projects/${issue.relatedProject.id}`}
                          className="font-medium text-gray-900"
                        >
                          {issue.relatedProject.title}
                        </Link>
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
                    </div>
                  </div>
                  <aside className="mt-8 xl:hidden">
                    <h2 className="sr-only">Details</h2>
                    <div className="space-y-5">
                      {issue.status === 'open' ? (
                        <div className="flex items-center space-x-2">
                          <LockOpenIcon
                            className="h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium text-green-700">
                            Open Issue
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <LockClosedIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium text-red-700">
                            Closeed Issue
                          </span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <ChatBubbleLeftEllipsisIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {issue.comments?.length}comments
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          Reported on{' '}
                          <time>
                            {new Date(issue.createdAt).toDateString()}
                          </time>
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 space-y-8 border-t border-b border-gray-200 py-6">
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">
                          Assignees
                        </h2>
                        <ul className="mt-3 space-y-3">
                          {issue.assignees?.map((assignee) => {
                            return (
                              <li
                                key={`key-${assignee.id}`}
                                className="flex justify-start"
                              >
                                <div className="flex-shrink-0">
                                  {assignee.profilePicture ? (
                                    <img
                                      className="h-5 w-5 rounded-full"
                                      src={assignee.profilePicture}
                                      alt={assignee.name}
                                    />
                                  ) : (
                                    <div className="h-5 w-5 rounded-full">
                                      <UserCircleIcon />{' '}
                                    </div>
                                  )}
                                </div>
                                <div className="text-sm font-medium text-gray-900 ml-2">
                                  {assignee.name}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">
                          Priority
                        </h2>
                        <h4 className="mt-2 leading-8">{issue.priority}</h4>
                      </div>
                    </div>
                  </aside>
                  <div className="py-3 xl:pt-6 xl:pb-0">
                    <h2 className="sr-only">Description</h2>
                    <div className="prose max-w-none">
                      <p>{issue.description}</p>
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
                        Comments
                      </h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <ul className="space-y-8">
                        {issue.comments?.map((comment) => (
                          <li key={`key-${comment.id}`}>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                {comment.commentedBy.profilePicture ? (
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={comment.commentedBy.profilePicture}
                                    alt={comment.commentedBy.name}
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full">
                                    <UserCircleIcon />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="text-sm">
                                  <div className="font-medium text-gray-900">
                                    {comment.commentedBy.name}
                                  </div>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{comment.content}</p>
                                </div>
                                <div className="mt-2 space-x-2 text-sm">
                                  <span className="font-medium text-gray-500">
                                    {daysdiff(comment.createdAt)}
                                  </span>
                                  <span className="font-medium text-gray-500">
                                    day ago
                                  </span>{' '}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        {user?.profilePicture ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.profilePicture}
                            alt={user.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full">
                            <UserCircleIcon />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div>
                            <label htmlFor="comment" className="sr-only">
                              About
                            </label>
                            <textarea
                              id="comment"
                              rows={3}
                              {...register('content')}
                              className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6"
                              placeholder="Add a note"
                            />
                            {errors.content?.message}
                          </div>
                          <div className="mt-3 flex items-center justify-start">
                            <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                              Comment
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="mt-10 flex items-center justify-end">
                {issue.status === 'open' ? (
                  <button
                    type="button"
                    className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <LockClosedIcon
                      className="-ml-0.5 h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <LockOpenIcon
                      className="-ml-0.5 h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                    Open Again
                  </button>
                )}
              </div>
            </div>
            <aside className="hidden xl:block xl:pl-8">
              <h2 className="sr-only">Details</h2>
              <div className="space-y-5">
                {issue.status === 'open' ? (
                  <div className="flex items-center space-x-2">
                    <LockOpenIcon
                      className="h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-green-700">
                      Open Issue
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LockClosedIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-red-700">
                      Closeed Issue
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <ChatBubbleLeftEllipsisIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {issue.comments?.length} comments
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Created on{' '}
                    <time> {new Date(issue.createdAt).toDateString()}</time>
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-8 border-t border-gray-200 py-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    Assignees
                  </h2>
                  <ul className="mt-3 space-y-3">
                    {issue.assignees?.map((assignee) => {
                      return (
                        <li
                          key={`key-${assignee.id}`}
                          className="flex justify-start"
                        >
                          <div className="flex-shrink-0">
                            {assignee.profilePicture ? (
                              <img
                                className="h-5 w-5 rounded-full"
                                src={assignee.profilePicture}
                                alt={assignee.name}
                              />
                            ) : (
                              <div className="h-5 w-5 rounded-full">
                                <UserCircleIcon />{' '}
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-medium text-gray-900 ml-2">
                            {assignee.name}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    Priority
                  </h2>
                  <h4 className="mt-2 leading-8">{issue.priority}</h4>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SingleIssue;
