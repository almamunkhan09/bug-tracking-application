'use client';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

export default function ContactForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const templateParams = {
        from_name: `${firstName} ${lastName}`,
        from_email: senderEmail,
        message,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID
          ? process.env.NEXT_PUBLIC_SERVICE_ID
          : '', // Replace with your service ID
        process.env.NEXT_PUBLIC_TEMPLATE_ID
          ? process.env.NEXT_PUBLIC_TEMPLATE_ID
          : '', // Replace with your template ID
        templateParams,
        process.env.NEXT_PUBLIC_KEY ? process.env.NEXT_PUBLIC_KEY : '', // Replace with your user ID
      );

      setFirstName('');
      setLastName('');
      setSenderEmail('');
      setMessage('');
      router.push('/');
    } catch (error) {
      console.log(error);
      alert('Error sending message');
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="px-6 pb-24 pt-20 sm:pb-32 lg:py-48 lg:px-8 "
      >
        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-white"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={firstName}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-white"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  name="last-name"
                  id="last-name"
                  value={lastName}
                  required
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-white"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={senderEmail}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  onChange={(e) => setSenderEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-white"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  required
                  rows={10}
                  className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Send message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
