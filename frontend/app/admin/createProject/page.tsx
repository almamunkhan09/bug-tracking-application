'use client';

import { PlusIcon } from '@heroicons/react/20/solid';

const team = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    imageUrl: '',
  },
  {
    name: 'Bessie Richards',
    email: 'bessie.richards@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Black',
    email: 'floyd.black@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

export default function Example() {
  return (
    <main className="mx-auto y-auto max-w-2xl w-full px-4 pt-10 pb-12 lg:pb-16">
      <form className=" mx-auto flex my-auto ">
        <div className="space-y-6">
          <div className="mx-auto">
            <h1 className="text-lg font-medium leading-6 text-gray-900 ">
              Create a new Project
            </h1>
          </div>

          <div>
            <label
              htmlFor="project-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Project Name
            </label>
            <div className="mt-2">
              <input
                name="project-name"
                id="project-name"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                defaultValue="Project Nero"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 px-2 sm:py-1.5 sm:text-sm sm:leading-6"
                defaultValue=""
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-2">
              <label
                htmlFor="add-team-members"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Add Team Members
              </label>
              <p id="add-team-members-helper" className="sr-only">
                Search by email address
              </p>
              <div className="flex">
                <div className="flex-grow">
                  <input
                    name="add-team-members"
                    id="add-team-members"
                    className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                    placeholder="Email address"
                    aria-describedby="add-team-members-helper"
                  />
                </div>
                <span className="ml-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <PlusIcon
                      className="-ml-0.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Add
                  </button>
                </span>
              </div>
            </div>

            <div className="border-b border-gray-200">
              <ul className="divide-y divide-gray-200">
                {team.map((person) => (
                  <li key={`person${person.email}`} className="flex py-4">
                    {/* <img
                      className="h-10 w-10 rounded-full"
                      src={person.imageUrl ? person.imageUrl : 'user.png'}
                      alt=""
                    /> */}
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src="https://pixabay.com/vectors/icon-user-person-symbol-people-1633249/"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="ml-3 flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {person.name}
                      </span>
                      {/* <span className="text-sm text-gray-500">
                        {person.email}
                      </span> */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tags
            </label>
            <input
              name="tags"
              id="tags"
              className="mt-2 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex justify-end gap-x-3">
            <button
              type="button"
              className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="rounded-md bg-sky-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
              Create this project
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
