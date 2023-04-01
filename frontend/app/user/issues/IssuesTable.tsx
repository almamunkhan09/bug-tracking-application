'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function IssuesTable() {
  const stringifiedUser = localStorage.getItem('user');
  const user = stringifiedUser && JSON.parse(stringifiedUser);
  const [issues, setIssues] = useState<any | null>(null);
  useEffect(() => {
    // setProjects(projects1);
    axios
      .get(`http://localhost:3600/api/users/${user.id}/relatedissues`)
      .then((res) => setIssues(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!issues) {
    return <div> Loading ...</div>;
  }
  if (!issues.length) {
    return <h2> You are not Assosiated with any Issue</h2>;
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Issues
          </h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full  table-auto  divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Project
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Reported By
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Assignee
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {' '}
                {/* Here is a type error need to fix later*/}
                {issues.map((issue: any) => (
                  <tr key={`key-${issue.id}`}>
                    <td className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 ">
                      <Link href={`/user/issues/${issue.id}`}>{issue.id}</Link>
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500 ">
                      {issue.title}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.relatedProject.title}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.reporter.name}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.status}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.priority}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.assignees
                        .map((assignee: any) => assignee.name)
                        .join(',')}
                    </td>
                    <td className="relative  py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link
                        href={`/user/issues/${issue.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
