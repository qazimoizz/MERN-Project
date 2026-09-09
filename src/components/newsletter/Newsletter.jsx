import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mb-20 sm:-mb-24">
      <div className="newsletter-card px-6 py-8 sm:px-12 sm:py-10 md:px-16 md:py-12 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight font-integral">
              STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </h2>
          </div>

          <div className="md:col-span-5 w-full">
            {subscribed ? (
              <div className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-full font-medium text-sm">
                <CheckCircle size={20} className="text-green-600" />
                <span>Thank you for subscribing to our newsletter!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="newsletter-input w-full pl-11 pr-4 py-3 rounded-full text-sm text-black outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                >
                  Subscribe to Newsletter
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

