'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type Inputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8, 'Minimum 8 charcters'),
});
const sendLoginRequest = async (email: string, password: string) => {
  try {
    const res = await axios.post('http://localhost:3600/api/users/login', {
      email: email,
      password: password,
    });
    return res;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      // Handle the case where the email is already taken
      throw new Error('Email or Password does not match');
    } else {
      console.log('Error:', err);
      throw new Error('Error while login');
    }
  }
};

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await sendLoginRequest(data.email, data.password);
      if (res.status === 200) {
        reset();

        setTimeout(() => {
          setIsLoading(false);
          return router.push('/user');
        }, 2000);

        setTimeout(() => {
          return router.push('/user');
        }, 4000);
      } else {
        return alert('Error While login');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <div className="flex  flex-col justify-center py-12 sm:px-6 lg:px-8  bg-gray-900 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-1 ">
        <img
          className="mx-auto h-20 w-auto"
          src="logo.svg"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-auto">
        <div className="bg-white py-10 px-4 shadow sm:rounded-lg sm:px-10 mb-11">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                />
                {errors.email?.message}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                />
                {errors.password?.message}
              </div>
            </div>

            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>

              {isLoading && <progress className="progress w-full"> </progress>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
