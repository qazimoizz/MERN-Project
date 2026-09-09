import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import './TopBanner.css';

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="top-banner relative py-2.5 px-4 text-center text-xs md:text-sm font-medium z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p>
          Sign up and get 20% off to your first order.{' '}
          <Link to="/register" className="top-banner-link font-semibold hover:text-gray-300 transition-colors">
            Sign Up Now
          </Link>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 md:right-8 text-white hover:text-gray-300 transition-colors p-1"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default TopBanner;

