import Link from 'next/link';
import { IconType } from 'react-icons';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
type Navigation = {
  name: string;
  href: string;
  current: boolean;
  icon: IconType;
}[];

function SideBarComponent({ navigation }: { navigation: Navigation }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
      <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
        <img
          className="h-8 w-auto"
          src="https://res.cloudinary.com/dubm2ec8s/image/upload/v1679444754/Pregressp_1_ksqyg5.svg"
          alt="Progresso"
        />
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <Link
              key={`key-${item.name}`}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              )}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-gray-300'
                    : 'text-gray-400 group-hover:text-gray-300',
                  'mr-3 h-6 w-6 flex-shrink-0',
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default SideBarComponent;
