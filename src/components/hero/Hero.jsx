import { Link } from 'react-router-dom';
import './Hero.css';

const StarIcon = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 0C50 27.614 27.614 50 0 50C27.614 50 50 72.386 50 100C50 72.386 72.386 50 100 50C72.386 50 50 27.614 50 0Z" />
  </svg>
);

const Hero = () => {
  return (
    <section className="hero-section overflow-hidden relative pt-8 md:pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 pb-10 md:pb-16 z-10">
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-black text-black uppercase tracking-tight mb-5 md:mb-7 font-integral">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>

            <Link
              to="/shop"
              className="inline-block w-full sm:w-auto text-center px-12 py-4 bg-black text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-sm mb-10 md:mb-12"
            >
              Shop Now
            </Link>

            <div className="flex flex-wrap items-center justify-between sm:justify-start gap-6 sm:gap-8 pt-6 border-t hero-stat-border">
              <div>
                <div className="text-2xl sm:text-4xl font-extrabold text-black font-integral">200+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">International Brands</div>
              </div>

              <div className="hidden sm:block h-12 w-[1px] bg-gray-200"></div>

              <div>
                <div className="text-2xl sm:text-4xl font-extrabold text-black font-integral">2,000+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">High-Quality Products</div>
              </div>

              <div className="hidden sm:block h-12 w-[1px] bg-gray-200"></div>

              <div>
                <div className="text-2xl sm:text-4xl font-extrabold text-black font-integral">30,000+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Happy Customers</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end self-end">
            <StarIcon className="w-12 h-12 md:w-16 md:h-16 text-black absolute top-6 left-4 md:left-2 animate-pulse" />
            <StarIcon className="w-20 h-20 md:w-24 md:h-24 text-black absolute top-2 right-4 md:right-0 animate-pulse" />

            <div className="relative w-full max-w-lg lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                alt="Shop.co Fashion Models"
                className="w-full object-contain object-bottom max-h-[500px] md:max-h-[620px] mx-auto filter drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

