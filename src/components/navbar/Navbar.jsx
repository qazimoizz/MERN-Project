import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ShieldCheck, LogOut, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { user, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const userDropdownRef = useRef(null);
  const shopDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target)) {
        setShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 bg-white z-40 navbar-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black hover:opacity-75 transition-opacity"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight font-integral">
              SHOP.CO
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-black">
            <div className="relative" ref={shopDropdownRef}>
              <button
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                className="flex items-center gap-1 hover:text-gray-600 transition-colors py-2"
              >
                <span>Shop</span>
                <ChevronDown size={16} className={`transition-transform ${shopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-lg rounded-xl py-2 mt-1 z-50">
                  <Link
                    to="/shop"
                    onClick={() => setShopDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    All Products
                  </Link>
                  <Link
                    to="/shop?category=T-shirts"
                    onClick={() => setShopDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    T-shirts
                  </Link>
                  <Link
                    to="/shop?category=Shirts"
                    onClick={() => setShopDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    Shirts
                  </Link>
                  <Link
                    to="/shop?category=Jeans"
                    onClick={() => setShopDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    Jeans
                  </Link>
                  <Link
                    to="/shop?category=Hoodie"
                    onClick={() => setShopDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    Hoodies
                  </Link>
                  <Link
                    to="/shop?category=Shorts"
                    onClick={() => setShopDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    Shorts
                  </Link>
                </div>
              )}
            </div>

            <Link to="/shop?dressStyle=Casual" className="hover:text-gray-600 transition-colors">
              On Sale
            </Link>
            <Link to="/shop?sort=newest" className="hover:text-gray-600 transition-colors">
              New Arrivals
            </Link>
            <a href="#brands" className="hover:text-gray-600 transition-colors">
              Brands
            </a>
          </nav>

          <div className="flex-1 max-w-lg hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full text-sm outline-none transition-all search-input"
              />
            </form>
          </div>

          <div className="flex items-center gap-4 sm:gap-5">
            <button
              onClick={() => {
                const searchEl = document.getElementById('mobile-search');
                if (searchEl) searchEl.focus();
              }}
              className="sm:hidden text-black hover:opacity-75 transition-opacity"
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            <Link to="/cart" className="relative text-black hover:opacity-75 transition-opacity" aria-label="Cart">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center text-black hover:opacity-75 transition-opacity"
                aria-label="User Account Menu"
              >
                <User size={22} />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-sm">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-black truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-full">
                            ADMIN
                          </span>
                        )}
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-black font-medium"
                        >
                          <ShieldCheck size={16} />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}

                      <Link
                        to="/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-black"
                      >
                        <Package size={16} />
                        <span>My Orders</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-red-600 text-left"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2.5 hover:bg-gray-50 text-black font-medium"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2.5 hover:bg-gray-50 text-black"
                      >
                        Register
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link
                        to="/admin/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                      >
                        <ShieldCheck size={16} />
                        <span>Admin Portal</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                <Search size={18} />
              </span>
              <input
                id="mobile-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full text-sm outline-none bg-gray-100"
              />
            </form>

            <div className="flex flex-col space-y-3 font-medium text-base">
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1 text-black hover:text-gray-600"
              >
                Shop All
              </Link>
              <Link
                to="/shop?dressStyle=Casual"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1 text-black hover:text-gray-600"
              >
                On Sale
              </Link>
              <Link
                to="/shop?sort=newest"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1 text-black hover:text-gray-600"
              >
                New Arrivals
              </Link>
              <a
                href="#brands"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1 text-black hover:text-gray-600"
              >
                Brands
              </a>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-1 font-bold text-black"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

