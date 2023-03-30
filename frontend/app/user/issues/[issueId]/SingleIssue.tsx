'use client';
import {
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const user = {
  id: '1234567',
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  profilePicture:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
};

const issue = {
  id: '12345',
  title: 'ARIA attribute misspelled',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic? Commodi cumque similique id tempora molestiae deserunt at suscipit, dolor voluptatem, numquam, harum consequatur laboriosam voluptas tempore aut voluptatum alias',
  status: 'open',
  priority: 'low',
  reporter: {
    id: '1',
    name: 'Al Mamun Khan',
  },
  assignees: [
    {
      id: '12',
      name: 'Majharul Islam',
      profilePicture:
        'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: '122',
      name: 'Shayan',
      profilePicture: '',
    },
  ],
  relatedProject: {
    id: '123456',
    title: 'Project Name',
  },
  comments: [
    {
      id: '123',
      content:
        'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
      commentedBy: {
        name: 'Leslie Alexander',
        id: '11',
        profilePicture:
          'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      },
      createdAt: '2022-02-02',
      updatedAt: '2023-04-04',
    },
    {
      id: '1234',
      content:
        'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
      commentedBy: {
        name: 'Michael Foster',
        id: '11',
        profilePicture: '',
      },
      createdAt: '2022-02-02',
      updatedAt: '2023-04-04',
    },
  ],
  createdAt: '2021-02-02',
  updatedAt: '2022-03-02',
};

function SingleIssue() {
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
                          href={`/user/project/${issue.relatedProject.id}`}
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
                          {issue.comments.length}comments
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          Repoted on <time>{issue.createdAt}</time>
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 space-y-8 border-t border-b border-gray-200 py-6">
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">
                          Assignees
                        </h2>
                        <ul className="mt-3 space-y-3">
                          {issue.assignees.map((assignee) => {
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
                        {issue.comments.map((comment) => (
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
                                    {comment.createdAt}
                                  </span>{' '}
                                  <span className="font-medium text-gray-500">
                                    &middot;
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
                        {user.profilePicture ? (
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
                        <form action="#">
                          <div>
                            <label htmlFor="comment" className="sr-only">
                              About
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              rows={3}
                              className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6"
                              placeholder="Add a note"
                            />
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
                    {issue.comments.length} comments
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Created on <time> {issue.createdAt}</time>
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-8 border-t border-gray-200 py-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    Assignees
                  </h2>
                  <ul className="mt-3 space-y-3">
                    {issue.assignees.map((assignee) => {
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
