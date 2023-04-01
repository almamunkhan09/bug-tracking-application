'use client';
import { Dialog, Transition } from '@headlessui/react';
// import { PlusIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
// import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as yup from 'yup';

interface AppProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  projectId: string;
}

type PeopleType = {
  id: string;
  name: string;
  isAdmin: boolean;
  email: string;
  profilePicture: string;
  createdAt: Date;
}[];

type Option = {
  label: string;
  value: string;
};

type Inputs = {
  title: string;
  description: string;
  // maintainers: string[];
  deadline: Date;
};

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

type ReqData = {
  title: string;
  description: string;
  status?: string;
  priority: string;
  reporterId: string;
  assigneeIds: string[] | null;
  relatedProjectId: string;
};

const createIssue = async (reqData: ReqData) => {
  const config = {
    withCredentials: true,
  };
  try {
    await axios.post('http://localhost:3600/api/issues', reqData, config);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
};

export default function NewIssue({ open, setOpen, projectId }: AppProps) {
  const [people, setPeople] = useState<
    { value: string; label: string }[] | null
  >(null);
  useEffect(() => {
    axios
      .get('http://localhost:3600/api/users/')
      .then((response) => {
        const teamMembers: PeopleType = response.data;
        const developers: PeopleType = teamMembers.filter(
          (member) => !member.isAdmin,
        );
        const team: { value: string; label: string }[] = developers.map(
          (member) => ({
            value: member.id,
            label: member.name,
          }),
        );
        console.log('team', team);
        setPeople(team);
        console.log('ProjectForm', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const stringifiedUser = localStorage.getItem('user');
  const user = stringifiedUser && JSON.parse(stringifiedUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [selectedOption, setSelectedOption] = useState<Option[] | null>(null);
  const [priority, setPriority] = useState<string>('low');

  const handleSelectChange = (option: Option[]) => {
    setSelectedOption(option);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const requestData: ReqData = {
      title: data.title,
      description: data.description,
      relatedProjectId: projectId,
      priority: priority,
      reporterId: user.id,
      assigneeIds:
        selectedOption &&
        selectedOption.map(
          (item: { value: string; label: string }) => item.value,
        ),
    };

    console.log(requestData);
    await createIssue(requestData);
    reset();
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            New Issue
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Fill the information to create a in this project
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Issue Title
                              </label>
                              <div className="mt-2">
                                <input
                                  id="project-name"
                                  {...register('title')}
                                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.title?.message}
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
                                  {...register('description')}
                                  rows={4}
                                  className="block w-full px-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                  defaultValue=""
                                />
                                {errors.description?.message}
                              </div>
                            </div>
                            <div>
                              {!people ? (
                                'Sorry There is no developers in your Team'
                              ) : (
                                <>
                                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                                    Assignees
                                  </h3>
                                  <div className="mt-2">
                                    <Select
                                      isMulti
                                      options={people}
                                      // @ts-ignore
                                      onChange={handleSelectChange}
                                      required
                                      className="basic-multi-select block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                      classNamePrefix="select"
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium leading-6 text-gray-900">
                                Priority
                              </h3>
                              <div className="mt-2">
                                <Select
                                  defaultValue={{ value: 'Low', label: 'Low' }}
                                  options={[
                                    { value: 'Low', label: 'Low' },
                                    { value: 'Medium', label: 'Medium' },
                                    { value: 'High', label: 'High' },
                                  ]}
                                  onChange={(event: any) => {
                                    setPriority(event.value);
                                    console.log(event.value);
                                  }}
                                  required
                                  className="basic-select block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                  classNamePrefix="select"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!people ? (
                      'Not Possible to create Issue. May be there is no developer in your team '
                    ) : (
                      <div className="flex flex-shrink-0 justify-end px-4 py-4">
                        <button
                          type="button"
                          className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Save
                        </button>
                      </div>
                    )}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
