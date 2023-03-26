// import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import uniqolor from 'uniqolor';

const projects = [
  {
    id: '12345',
    title: 'Graph ql Api',
    description: 'Hello we are working on graphql api ',
    createdBy: 'Al Mamun Khan',
    maintainers: ['Al Mamun Khan'],
  },
  {
    id: '12346',
    title: 'Rest Api',
    description: 'Lets work on Rest API ',
    createdBy: 'Al Mamun Khan',
    maintainers: ['Al Mamun Khan', 'Majharrul islam'],
  },
  {
    id: '12347',
    title: 'Implementing Trpc',
    description: 'Lets work on TRPC',
    createdBy: 'Al Mamun Khan',
    maintainers: ['Al Mamun Khan', 'Majharrul islam'],
  },
  {
    id: '12348',
    title: 'Rest Api gsgdhfjfghfdhdfh sdgsdfgdfg',
    description: 'Lets work on Rest API ',
    createdBy: 'Al Mamun Khan',
    maintainers: ['Al Mamun Khan', 'Majharrul islam', 'Khaled Chowdhury'],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
function twoWordName(name: string) {
  const nameArray: string[] = name.split(' ');

  return nameArray.length > 1
    ? `${nameArray[0][0]}${nameArray[1][0]}`
    : nameArray[0][0];
}

export default function StatCard() {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">Recent Projects</h2>
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {projects.map((project) => (
          <li
            key={`key-${project.id}`}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            <div
              style={{ backgroundColor: uniqolor.random().color }}
              className={classNames(
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
              )}
            >
              {twoWordName(project.title)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a
                  href={`/projects/${project.id}`}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {project.title}
                </a>
                <p className="text-gray-500">
                  {project.maintainers.length} Members
                </p>
              </div>
              {/* <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
