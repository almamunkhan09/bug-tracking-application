'use client';

import { Dialog, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import {
  Bars3BottomLeftIcon,
  BellIcon,
  BugAntIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import axios, { AxiosResponse } from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, ReactNode, useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

function twoWordName(name: string) {
  const nameArray: string[] = name.split(' ');

  return nameArray.length > 1
    ? `${nameArray[0][0]}${nameArray[1][0]}`
    : nameArray[0][0];
}

const navigation = [
  { name: 'Home', href: '/user', icon: HomeIcon, current: true },
  {
    name: 'Projects',
    href: '/user/projects',
    icon: FolderIcon,
    current: false,
  },

  // {
  //   name: 'Reports',
  //   href: '/user/reports',
  //   icon: ChartBarIcon,
  //   current: false,
  // },
  { name: 'Issues', href: '/user/issues', icon: BugAntIcon, current: false },
  {
    name: 'Team',
    href: '/user/team',
    icon: UsersIcon,
    current: false,
  },
];
// const user1 = {
//   id: '1',
//   name: 'Al Mamun khan',
//   isAdmin: false,
//   profilePicture:
//     'https://res.cloudinary.com/dubm2ec8s/image/upload/v1679444754/Pregressp_1_ksqyg5.svg',
//   email: 'almamunkhan09@gmail.com',
// };

const userNavigation = [
  { name: 'Your Profile', href: `/user/profile` },
  { name: 'Sign out', href: `/user/logout}` },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
type User = {
  id: string;
  name: string;
  isAdmin: boolean;
  profilePicture: string;
  email: string;
};

let firstRender = true;
export default function CustomLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    if (firstRender) {
      axios
        .get(`http://localhost:3600/api/users/singleuser`, config)
        .then((response) => {
          // console.log('Success from custom layout !', response.data);
          setUser(response.data);
          firstRender = false;
          console.log(firstRender);
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }

    const interval = setInterval(() => {
      axios
        .get(`http://localhost:3600/api/users/refreshtoken`, config)
        .then((response) => {
          // console.log('Success from custom layout !', response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }, 1000 * 60 * 50);
    return () => clearInterval(interval);
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathName = usePathname();
  navigation.map((nav) => {
    if (nav.href.split('/')[2] === pathName.split('/')[2]) {
      return (nav.current = true);
    } else {
      return (nav.current = false);
    }
  });

  if (!user) return <div> </div>;

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://res.cloudinary.com/dubm2ec8s/image/upload/v1679444754/Pregressp_1_ksqyg5.svg"
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) =>
                        item.name === 'Team' && !user.isAdmin ? (
                          ''
                        ) : (
                          <Link
                            key={`key-${item.name}`}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? 'text-gray-300'
                                  : 'text-gray-400 group-hover:text-gray-300',
                                'mr-4 h-6 w-6 flex-shrink-0',
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ),
                      )}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
              <img
                className="h-8 w-auto"
                src="https://res.cloudinary.com/dubm2ec8s/image/upload/v1679444754/Pregressp_1_ksqyg5.svg"
                alt="Your Company"
              />
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) =>
                  item.name === 'Team' && !user.isAdmin ? (
                    ''
                  ) : (
                    <Link
                      key={`key-${item.name}`}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-300'
                            : 'text-gray-400 group-hover:text-gray-300',
                          'mr-3 h-6 w-6 flex-shrink-0',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ),
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full lg:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center lg:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      {user.profilePicture ? (
                        <img
                          className="mx-auto h-8 w-8 rounded-full"
                          src={user.profilePicture}
                          alt=""
                        />
                      ) : (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                          <span className="text-sm font-medium leading-none text-white">
                            {twoWordName(user.name)}
                          </span>
                        </span>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={`key-${item.name}`}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">
            <div className="py-10 mx-auto px-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
