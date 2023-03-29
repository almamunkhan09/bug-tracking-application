'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { FaGithub, FaGoogle } from 'react-icons/fa'; // kept for future devlopment
import * as yup from 'yup';

type Inputs = {
  name: string;

  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8, 'Minimum 8 charcters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
const sendSignUpRequest = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await axios.post('http://localhost:3600/api/users/', {
      name: name,
      email: email,
      password: password,
    });
    return res;
  } catch (err: any) {
    if (err.response && err.response.status === 409) {
      // Handle the case where the email is already taken
      throw new Error('Email is already taken.');
    } else {
      console.log('Error:', err);
      throw new Error('Error creating user.');
    }
  }
};

export default function SignUp() {
  useEffect(() => {
    return () => {
      // This function is called when the component is unmounted
      return;
    };
  }, []);

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
    try {
      const res = await sendSignUpRequest(data.name, data.email, data.password);
      if (res.status === 201) {
        reset();
        return router.push('/login');
      } else {
        return alert('Error');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <div className="flex flex-col justify-center  sm:px-6 lg:px-8 bg-gray-900 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <img className="mx-auto h-20 w-auto" src="logo.svg" alt="Progresso" />
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-white">
          Signup
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow sm:rounded-lg sm:px-10 mb-11">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  autoComplete="name"
                  {...register('name', { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name?.message}
              </div>
            </div>
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
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password?.message}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  {...register('confirmPassword')}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword?.message}
              </div>
            </div>

            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
