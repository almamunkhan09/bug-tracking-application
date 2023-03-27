import Link from 'next/link';
import IssueModal from './IssueModal';

const issues = [
  {
    id: '1',
    title: 'There is bug in graphql api',
    description:
      'Hi is is not working well .................. Hdgajdbajkdadnasdl',
    project: 'Graphql Api',
    status: 'open',
    priority: 'low',
    dueDate: '22.2..23',
    reportedBy: 'Al Mamun Khan',
    assignees: ['Al Mamun khan', 'Majharul Islam'],
  },
  {
    id: '2',
    title: 'There is bug in rest Api',
    description:
      'Hi is is not working well .................. Hdgajdbajkdadnasdl',
    project: 'Rest Api',
    status: 'open',
    priority: 'low',
    dueDate: '22.2..23',
    reportedBy: 'Al Mamun Khan',
    assignees: ['Al Mamun khan', 'Majharul Islam'],
  },
];

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

export default function IssuesTable() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Issues
          </h1>
          {/* <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p> */}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {/* The button to open modal */}
          <IssueModal />
          {/* <NewProjectForm open={open} setOpen={setOpen} /> */}
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
                {issues.map((issue) => (
                  <tr key={`key-${issue.id}`}>
                    <td className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 ">
                      <Link href={`/projects/${issue.id}`}>{issue.id}</Link>
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500 ">
                      {issue.title}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.project}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.reportedBy}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.priority}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.status}
                    </td>
                    <td className=" py-4 px-3 text-sm text-gray-500">
                      {issue.status}
                    </td>
                    <td className="relative  py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href={`/projects/${issue.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit<span className="sr-only">, {issue.title}</span>
                      </a>
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
