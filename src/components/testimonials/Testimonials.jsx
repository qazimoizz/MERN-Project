import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import StarRating from '../starrating/StarRating';
import './Testimonials.css';

const reviewsData = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    quote: `"I'm blown away by the quality and style of the clothes I received from SHOP.CO. From casual wear to elegant dresses, every item has exceeded my expectations."`
  },
  {
    id: 2,
    name: 'Alex K.',
    rating: 5,
    quote: `"Finding clothes that align with my personal style used to be a challenge until I discovered SHOP.CO. The range of options they offer is truly remarkable and delivery was ultra fast!"`
  },
  {
    id: 3,
    name: 'James L.',
    rating: 5,
    quote: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon SHOP.CO. The selection of clothes is not only diverse but also on-point with modern trends."`
  },
  {
    id: 4,
    name: 'Emily R.',
    rating: 5,
    quote: `"The fabric quality is top-notch. I washed my t-shirts multiple times and they still look brand new. Customer service was super responsive when I inquired about sizing."`
  }
];

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const visibleReviews = [
    reviewsData[startIndex % reviewsData.length],
    reviewsData[(startIndex + 1) % reviewsData.length],
    reviewsData[(startIndex + 2) % reviewsData.length]
  ];

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight font-integral">
            OUR HAPPY CUSTOMERS
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleReviews.map((rev) => (
            <div key={rev.id} className="testimonial-card p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                <div className="mb-4">
                  <StarRating rating={rev.rating} size={18} showScore={false} />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-base sm:text-lg text-black">{rev.name}</span>
                  <span className="verified-badge rounded-full p-0.5 inline-flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {rev.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

