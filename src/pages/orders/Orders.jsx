import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import api from '../../utils/api';
import { formatPrice, getImageUrl } from '../../utils/helpers';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get('/orders/my-orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-badge-delivered';
      case 'Shipped':
        return 'status-badge-shipped';
      case 'Processing':
        return 'status-badge-processing';
      case 'Cancelled':
        return 'status-badge-cancelled';
      default:
        return 'status-badge-pending';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'My Orders' }]} />

      <h1 className="text-3xl sm:text-4xl font-black text-black uppercase font-integral tracking-tight my-6">
        MY ORDERS
      </h1>

      {loading ? (
        <div className="py-16 flex justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl p-8">
          <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={28} />
          </div>
          <h2 className="text-xl font-bold text-black mb-2">No Orders Found</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders with SHOP.CO yet.</p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-full text-sm hover:bg-neutral-800"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="order-card p-6 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">Order ID</span>
                  <span className="font-mono font-bold text-sm text-black">#{order._id}</span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={14} />
                    <span>{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="py-4 space-y-3">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black truncate">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-black shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm">
                <span className="text-gray-500">
                  Payment: <span className="text-black font-medium">{order.paymentMethod}</span>
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Order Total:</span>
                  <span className="text-base sm:text-lg font-black text-black">
                    {formatPrice(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

