'use client';
import { FaGithub, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

const navigation = [
  {
    name: 'Twitter',
    href: '/',
    icon: FaTwitter,
  },
  {
    name: 'GitHub',
    href: '/',
    icon: FaGithub,
  },
  {
    name: 'YouTube',
    href: '/',
    icon: FaYoutube,
  },
  {
    name: 'Linkedin',
    href: '/',
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 ">
      <div className="border-t border-b border-white/10 pt-8 lg:flex lg:items-center lg:justify-between mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div>
          <h3 className="text-sm font-semibold leading-6 text-white">
            Subscribe to our newsletter
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
        </div>
        <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="email-address"
            id="email-address"
            autoComplete="email"
            required
            className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-56 sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
            <button className="flex w-full items-center justify-center rounded-md bg-indigo-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div className=" mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8 ">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={`nav-${item.name}`}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>

              <item.icon />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Your Company, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
