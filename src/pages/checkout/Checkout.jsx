import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { formatPrice } from '../../utils/helpers';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, subtotal, totalDiscount, deliveryFee, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    address: '452 Fashion Boulevard, Suite 300',
    city: 'New York',
    postalCode: '10001',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    try {
      setSubmitting(true);
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        title: item.product.title,
        image: item.product.images?.[0] || '',
        size: item.size,
        color: item.color.name,
        quantity: item.quantity,
        price: item.price
      }));

      const res = await api.post('/orders', {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        discountPrice: totalDiscount,
        shippingPrice: deliveryFee,
        totalPrice
      });

      clearCart();
      setOrderPlaced(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error placing order. Please make sure you are logged in.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={36} />
        </div>

        <h1 className="text-3xl font-black text-black font-integral mb-3">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">
          Thank you for your purchase. Your order ID is:
        </p>
        <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-xs font-mono font-bold mb-6">
          {orderPlaced._id}
        </span>

        <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
          We've received your order and are getting it ready for shipment. You will receive an email confirmation shortly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orders"
            className="w-full sm:w-auto px-8 py-3.5 bg-black text-white rounded-full font-semibold text-sm hover:bg-neutral-800"
          >
            View My Orders
          </Link>
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 border border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
        <Link to="/shop" className="px-6 py-2.5 bg-black text-white rounded-full font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />

      <h1 className="text-3xl sm:text-4xl font-black text-black uppercase font-integral tracking-tight my-6">
        CHECKOUT
      </h1>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="checkout-card p-6 bg-white">
              <h2 className="text-xl font-bold text-black mb-4">Shipping Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            <div className="checkout-card p-6 bg-white">
              <h2 className="text-xl font-bold text-black mb-4">Payment Method</h2>

              <div className="space-y-3">
                {['Credit Card', 'PayPal', 'Cash on Delivery'].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-black focus:ring-black"
                      />
                      <span className="text-sm font-semibold text-black">{method}</span>
                    </div>

                    {method === 'Credit Card' && <CreditCard size={20} className="text-gray-500" />}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="checkout-card p-6 bg-white sticky top-24">
              <h2 className="text-xl font-bold text-black mb-6">Review Order</h2>

              <div className="max-h-60 overflow-y-auto space-y-3 pb-6 border-b border-gray-100 pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={`${item.product._id}-${item.size}-${item.color.name}`} className="flex items-center justify-between text-sm">
                    <div className="flex-1 pr-2">
                      <p className="font-semibold text-black truncate">{item.product.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.size} • {item.color.name} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-black">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-6 border-b border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-bold text-red-500">-{formatPrice(totalDiscount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-black">{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
                </div>
              </div>

              <div className="flex justify-between py-6 border-b border-gray-100 text-lg">
                <span className="font-bold text-black">Total</span>
                <span className="text-2xl font-black text-black">{formatPrice(totalPrice)}</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 mt-6 bg-black text-white text-base font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-sm disabled:opacity-50"
              >
                {submitting ? 'Placing Order...' : 'Confirm & Place Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

