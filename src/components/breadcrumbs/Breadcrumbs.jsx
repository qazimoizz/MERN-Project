import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="breadcrumbs-container flex items-center gap-1.5 text-xs sm:text-sm py-4 overflow-x-auto whitespace-nowrap">
      <Link to="/" className="hover:text-black transition-colors">
        Home
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-gray-400 shrink-0" />
            {isLast || !item.link ? (
              <span className="text-black font-semibold truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            ) : (
              <Link to={item.link} className="hover:text-black transition-colors">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

