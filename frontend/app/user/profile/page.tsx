'use client';
import React, { useState } from 'react';

const user = {
  id: '1',
  name: 'Al Mamun khan',
  isAdmin: true,
  profilePicture:
    'https://res.cloudinary.com/dubm2ec8s/image/upload/v1679444754/Pregressp_1_ksqyg5.svg',
  email: 'almamunkhan09@gmail.com',
};

function Page() {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <main className="flex flex-1 overflow-hidden">
      <div className="flex flex-1 flex-col overflow-y-auto xl:overflow-hidden">
        {/* Main content */}
        <div className="flex-1 xl:overflow-y-auto">
          <div className=" max-w-full py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Account
            </h1>

            <form className="divide-y-slate-200 mt-6 space-y-8 divide-y">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                <div className="sm:col-span-6">
                  <h2 className="text-xl font-medium text-slate-900">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Name
                  </label>
                  <input
                    name="first-name"
                    id="first-name"
                    value={user.name}
                    disabled={!editOpen}
                    autoComplete="given-name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center">
                    <img
                      className="inline-block h-20 w-20 rounded-full"
                      src={user.profilePicture}
                      alt={user.name}
                    />
                    {!editOpen ? (
                      <div className="relative ml-4">
                        <input
                          id="user-photo"
                          name="user-photo"
                          type="file"
                          className="peer absolute inset-0 h-full w-full rounded-md opacity-0"
                        />
                        <label
                          htmlFor="user-photo"
                          className="pointer-events-none block rounded-md bg-white py-2 px-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 peer-hover:bg-slate-50 peer-focus:ring-2 peer-focus:ring-blue-600"
                        >
                          <span>Change</span>
                          <span className="sr-only"> user photo</span>
                        </label>
                      </div>
                    ) : (
                      ' '
                    )}

                    {/* <button
                      type="button"
                      className="ml-6 text-sm font-medium leading-6 text-slate-900"
                    >
                      Remove
                    </button> */}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
                {/* <div className="sm:col-span-6">
                  <h2 className="text-xl font-medium text-slate-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div> */}

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Email address
                  </label>
                  <input
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    value={user.email}
                    disabled={!editOpen}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>

                <p className="text-sm text-slate-500 sm:col-span-6">
                  This account was created on{' '}
                  <time dateTime="2017-01-05T20:35:40">
                    January 5, 2017, 8:35:40 PM
                  </time>
                  .
                </p>
              </div>

              <div className="flex justify-end gap-x-3 pt-8">
                <button
                  type="button"
                  className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button className="inline-flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
