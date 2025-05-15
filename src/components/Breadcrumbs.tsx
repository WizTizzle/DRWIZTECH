import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const formatPathname = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="text-sm mb-6">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={name}>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                {isLast ? (
                  <span className="text-gray-700">
                    {formatPathname(name)}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {formatPathname(name)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}