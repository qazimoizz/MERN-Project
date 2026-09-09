import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container pt-32 sm:pt-36 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-black/10">
          <div className="lg:col-span-4">
            <Link to="/" className="text-3xl font-extrabold text-black tracking-tight font-integral inline-block mb-4">
              SHOP.CO
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-6">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn w-9 h-9 rounded-full flex items-center justify-center text-black"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn w-9 h-9 rounded-full flex items-center justify-center text-black"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn w-9 h-9 rounded-full flex items-center justify-center text-black"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn w-9 h-9 rounded-full flex items-center justify-center text-black"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-black tracking-widest text-xs uppercase mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/shop" className="hover:text-black transition-colors">About</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">Features</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">Works</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">Career</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-black tracking-widest text-xs uppercase mb-4">Help</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/shop" className="hover:text-black transition-colors">Customer Support</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">Delivery Details</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-black tracking-widest text-xs uppercase mb-4">FAQ</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/login" className="hover:text-black transition-colors">Account</Link></li>
              <li><Link to="/orders" className="hover:text-black transition-colors">Manage Deliveries</Link></li>
              <li><Link to="/orders" className="hover:text-black transition-colors">Orders</Link></li>
              <li><Link to="/cart" className="hover:text-black transition-colors">Payments</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-black tracking-widest text-xs uppercase mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/shop" className="hover:text-black transition-colors">Free eBooks</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">Development Tutorial</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">How to - Blog</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">Youtube Playlist</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            Shop.co © 2000-2026, All Rights Reserved
          </p>

          <div className="flex items-center gap-2">
            <div className="payment-badge px-3 py-1.5 text-xs font-bold text-blue-800">VISA</div>
            <div className="payment-badge px-3 py-1.5 text-xs font-bold text-red-600">Mastercard</div>
            <div className="payment-badge px-3 py-1.5 text-xs font-bold text-blue-600">PayPal</div>
            <div className="payment-badge px-3 py-1.5 text-xs font-bold text-black">Pay</div>
            <div className="payment-badge px-3 py-1.5 text-xs font-bold text-gray-700">G Pay</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

