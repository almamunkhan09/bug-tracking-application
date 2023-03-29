'use client';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  profilePicture: File;
};

type Props = {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Example({ setEditOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="bg-white shadow sm:rounded-lg mt-10">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Update your data
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Change your name and profile picture</p>
        </div>
        <form
          className="mt-5  sm:items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full sm:max-w-xs">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 mb-3 "
              placeholder="Name"
              {...register('name')}
            />
          </div>
          <div className="w-full sm:max-w-xs">
            <label htmlFor="profile-picture" className="sr-only">
              Profile Picture
            </label>

            <input
              type="file"
              id="profile-picture"
              className="file-input file-input-bordered file-input-primary  file-input-md w-full max-w-xs"
              {...register('profilePicture')}
            />
          </div>
          <div className="mt-3">
            <button className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0  sm:w-auto">
              Save
            </button>
            <button
              className="mt-5 ml-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0  sm:w-auto"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
