import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Store,
  Calendar,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { formatPrice, getImageUrl } from '../../utils/helpers';
import './AdminOrders.css';

const AdminOrders = () => {
  const { logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders/admin/all');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((ord) => (ord._id === orderId ? { ...ord, status: res.data.status } : ord))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="admin-sidebar w-full md:w-64 p-6 shrink-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Link to="/" className="text-2xl font-black tracking-tight font-integral text-white">
              SHOP.CO
            </Link>
            <span className="px-2 py-0.5 bg-neutral-800 text-[10px] font-bold rounded text-gray-300">
              ADMIN
            </span>
          </div>

          <nav className="space-y-1.5">
            <Link to="/admin" className="admin-nav-item">
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </Link>
            <Link to="/admin/products" className="admin-nav-item">
              <Package size={18} />
              <span>Products CRUD</span>
            </Link>
            <Link to="/admin/orders" className="admin-nav-item active">
              <ShoppingBag size={18} />
              <span>Manage Orders</span>
            </Link>
            <Link to="/" className="admin-nav-item">
              <Store size={18} />
              <span>View Storefront</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-neutral-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-sm text-red-400 hover:text-red-300 font-medium py-2"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Customer Orders</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Monitor incoming purchases and update fulfillment statuses
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white admin-orders-card p-8">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
              <ShoppingBag size={24} />
            </div>
            <h3 className="text-lg font-bold text-black mb-1">No Orders Found</h3>
            <p className="text-xs sm:text-sm text-gray-500">Customer checkout orders will appear here in real-time.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div key={ord._id} className="admin-orders-card bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-base text-black">#{ord._id}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={13} />
                        {new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Customer: <span className="font-semibold text-black">{ord.shippingAddress?.fullName || ord.user?.name}</span> ({ord.user?.email || 'Guest'})
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-500">Status:</span>
                    <div className="relative">
                      <select
                        disabled={updatingId === ord._id}
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                        className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wider outline-none bg-white cursor-pointer hover:border-black"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Items Ordered</h4>
                    <div className="space-y-2.5">
                      {ord.orderItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                            <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-black truncate">{item.title}</p>
                            <p className="text-[11px] text-gray-500">
                              {item.size} • {item.color} • Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-black">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl text-xs space-y-2 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-black uppercase tracking-wider mb-2">Shipping Destination</h4>
                      <p className="text-gray-700 font-medium">{ord.shippingAddress?.fullName}</p>
                      <p className="text-gray-600">{ord.shippingAddress?.address}</p>
                      <p className="text-gray-600">
                        {ord.shippingAddress?.city}, {ord.shippingAddress?.postalCode}
                      </p>
                      <p className="text-gray-600">{ord.shippingAddress?.country}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-gray-500">Payment: {ord.paymentMethod}</span>
                      <span className="text-base font-black text-black">Total: {formatPrice(ord.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;

