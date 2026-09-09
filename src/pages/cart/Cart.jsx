import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, Tag } from 'lucide-react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { formatPrice, getImageUrl } from '../../utils/helpers';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalDiscount,
    deliveryFee,
    totalPrice,
    promoCode,
    applyPromoCode
  } = useCart();

  const [inputPromo, setInputPromo] = useState(promoCode || '');
  const [promoMessage, setPromoMessage] = useState(null);
  const navigate = useNavigate();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    const result = applyPromoCode(inputPromo);
    setPromoMessage(result);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Cart' }]} />

      <h1 className="text-3xl sm:text-4xl font-black text-black uppercase font-integral tracking-tight my-6">
        YOUR CART
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-black mb-3">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven't added any clothes to your shopping bag yet.
          </p>
          <Link
            to="/shop"
            className="inline-block px-10 py-3.5 bg-black text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="cart-items-card p-4 sm:p-6 bg-white space-y-6">
              {cartItems.map((item, index) => {
                const isLast = index === cartItems.length - 1;
                const img = item.product.images && item.product.images.length > 0
                  ? getImageUrl(item.product.images[0])
                  : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

                return (
                  <div key={`${item.product._id}-${item.size}-${item.color.name}`}>
                    <div className="flex gap-4 sm:gap-6">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={img}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              to={`/product/${item.product._id}`}
                              className="font-bold text-base sm:text-lg text-black hover:text-gray-600 transition-colors line-clamp-1"
                            >
                              {item.product.title}
                            </Link>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                              Size: <span className="text-black font-medium">{item.size}</span>
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
                              Color:{' '}
                              <span
                                className="inline-block w-3 h-3 rounded-full border border-gray-300"
                                style={{ backgroundColor: item.color.hex }}
                              ></span>
                              <span className="text-black font-medium">{item.color.name}</span>
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product._id, item.size, item.color.name)}
                            className="text-red-500 hover:text-red-700 p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-lg sm:text-xl font-extrabold text-black">
                            {formatPrice(item.price)}
                          </span>

                          <div className="qty-pill flex items-center gap-3 px-4 py-1.5 bg-gray-100 rounded-full">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.size,
                                  item.color.name,
                                  item.quantity - 1
                                )
                              }
                              className="text-black hover:opacity-75"
                            >
                              <Minus size={15} />
                            </button>
                            <span className="font-bold text-xs sm:text-sm text-black w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.size,
                                  item.color.name,
                                  item.quantity + 1
                                )
                              }
                              className="text-black hover:opacity-75"
                            >
                              <Plus size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isLast && <div className="border-b border-gray-100 mt-6"></div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="summary-card p-6 bg-white sticky top-24">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-gray-100 text-sm sm:text-base">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-bold text-red-500">
                    -{formatPrice(totalDiscount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-black">
                    {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-6 border-b border-gray-100 text-base sm:text-lg">
                <span className="font-semibold text-black">Total</span>
                <span className="text-xl sm:text-2xl font-black text-black">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <form onSubmit={handleApplyPromo} className="my-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                      <Tag size={18} />
                    </span>
                    <input
                      type="text"
                      value={inputPromo}
                      onChange={(e) => setInputPromo(e.target.value)}
                      placeholder="Add promo code (try SHOP20)"
                      className="promo-input w-full pl-11 pr-4 py-3 rounded-full text-xs sm:text-sm outline-none font-medium text-black uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p
                    className={`text-xs mt-2 font-medium ${
                      promoMessage.success ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {promoMessage.message}
                  </p>
                )}
              </form>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-black text-white text-sm sm:text-base font-semibold rounded-full hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Go to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

