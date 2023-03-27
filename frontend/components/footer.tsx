'use client';
import Link from 'next/link';
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
    <div className="bg-gray-900 my-auto py-10">
      <div className=" mx-auto  my-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8 ">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <Link
              key={`nav-${item.name}`}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>

              <item.icon />
            </Link>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0 py-5">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Al Mamun Khan
          </p>
        </div>
      </div>
    </div>
  );
}
