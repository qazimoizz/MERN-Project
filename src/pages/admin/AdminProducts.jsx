import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Store,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { formatPrice, getImageUrl } from '../../utils/helpers';
import { CATEGORIES, DRESS_STYLES, SIZES, COLORS } from '../../utils/constants';
import './AdminProducts.css';

const AdminProducts = () => {
  const { logout } = useAuth();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '0',
    category: 'T-shirts',
    dressStyle: 'Casual',
    stock: '20',
    isNewArrival: false,
    isTopSelling: false,
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [{ name: 'Black', hex: '#000000' }]
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchProducts();
    if (searchParams.get('action') === 'new') {
      handleOpenAddModal();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products?limit=100');
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      discountPercentage: '0',
      category: 'T-shirts',
      dressStyle: 'Casual',
      stock: '20',
      isNewArrival: false,
      isTopSelling: false,
      sizes: ['Small', 'Medium', 'Large', 'X-Large'],
      colors: [{ name: 'Black', hex: '#000000' }]
    });
    setImageFiles([]);
    setImagePreviews([]);
    setModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setIsEditing(true);
    setEditingId(prod._id);
    setFormData({
      title: prod.title,
      description: prod.description,
      price: prod.price.toString(),
      discountPercentage: (prod.discountPercentage || 0).toString(),
      category: prod.category,
      dressStyle: prod.dressStyle || 'Casual',
      stock: (prod.stock || 10).toString(),
      isNewArrival: Boolean(prod.isNewArrival),
      isTopSelling: Boolean(prod.isTopSelling),
      sizes: prod.sizes || ['Small', 'Medium', 'Large', 'X-Large'],
      colors: prod.colors && prod.colors.length > 0 ? prod.colors : [{ name: 'Black', hex: '#000000' }]
    });
    setImageFiles([]);
    setImagePreviews(prod.images ? prod.images.map((img) => getImageUrl(img)) : []);
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const toggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const toggleColor = (colorObj) => {
    setFormData((prev) => {
      const exists = prev.colors.some((c) => c.name === colorObj.name);
      return {
        ...prev,
        colors: exists
          ? prev.colors.filter((c) => c.name !== colorObj.name)
          : [...prev.colors, { name: colorObj.name, hex: colorObj.hex }]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('discountPercentage', formData.discountPercentage);
      data.append('category', formData.category);
      data.append('dressStyle', formData.dressStyle);
      data.append('stock', formData.stock);
      data.append('isNewArrival', formData.isNewArrival.toString());
      data.append('isTopSelling', formData.isTopSelling.toString());
      data.append('sizes', JSON.stringify(formData.sizes));
      data.append('colors', JSON.stringify(formData.colors));

      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          data.append('images', file);
        });
      }

      const headers = { 'Content-Type': 'multipart/form-data' };

      if (isEditing) {
        await api.put(`/products/${editingId}`, data, { headers });
      } else {
        await api.post('/products', data, { headers });
      }

      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting product');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = categoryFilter ? p.category.toLowerCase() === categoryFilter.toLowerCase() : true;
    return matchesSearch && matchesCat;
  });

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
            <Link to="/admin/products" className="admin-nav-item active">
              <Package size={18} />
              <span>Products CRUD</span>
            </Link>
            <Link to="/admin/orders" className="admin-nav-item">
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Product Management</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Create, update, inspect and delete catalog items with image upload
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search products by title or category..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none font-medium cursor-pointer"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-table-card bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-sm">
              No products match your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-6 font-semibold">Product</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Style</th>
                    <th className="py-3 px-4 font-semibold">Price</th>
                    <th className="py-3 px-4 font-semibold">Discount</th>
                    <th className="py-3 px-4 font-semibold">Stock</th>
                    <th className="py-3 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((prod) => (
                    <tr key={prod._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                            <img
                              src={getImageUrl(prod.images?.[0])}
                              alt={prod.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-black line-clamp-1">{prod.title}</p>
                            <span className="text-[11px] text-gray-400 font-mono">ID: {prod._id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-gray-700">{prod.category}</td>
                      <td className="py-3.5 px-4 text-gray-600">{prod.dressStyle || 'Casual'}</td>
                      <td className="py-3.5 px-4 font-bold text-black">{formatPrice(prod.price)}</td>
                      <td className="py-3.5 px-4">
                        {prod.discountPercentage > 0 ? (
                          <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded-full">
                            -{prod.discountPercentage}%
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">None</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`font-semibold ${prod.stock < 10 ? 'text-red-600' : 'text-gray-800'}`}>
                          {prod.stock}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod._id, prod.title)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-black">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Slim Fit Denim Jacket"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive description of materials, fit, and style..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Dress Style</label>
                  <select
                    value={formData.dressStyle}
                    onChange={(e) => setFormData({ ...formData, dressStyle: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
                  >
                    {DRESS_STYLES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-6 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNewArrival}
                      onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                      className="w-4 h-4 rounded text-black focus:ring-black"
                    />
                    <span className="text-xs font-medium text-gray-800">New Arrival</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isTopSelling}
                      onChange={(e) => setFormData({ ...formData, isTopSelling: e.target.checked })}
                      className="w-4 h-4 rounded text-black focus:ring-black"
                    />
                    <span className="text-xs font-medium text-gray-800">Top Selling</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((sz) => {
                    const active = formData.sizes.includes(sz);
                    return (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          active ? 'bg-black text-white font-semibold' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Available Colors</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((col) => {
                    const active = formData.colors.some((c) => c.name === col.name);
                    return (
                      <button
                        type="button"
                        key={col.name}
                        onClick={() => toggleColor(col)}
                        style={{ backgroundColor: col.hex }}
                        className={`w-7 h-7 rounded-full border transition-transform flex items-center justify-center ${
                          col.border ? 'border-gray-300' : 'border-transparent'
                        } ${active ? 'scale-110 ring-2 ring-black ring-offset-2' : ''}`}
                        title={col.name}
                      >
                        {active && (
                          <span className={`text-[10px] font-bold ${col.name === 'White' ? 'text-black' : 'text-white'}`}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Image (Multer File Upload)
                </label>
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-xs font-semibold text-black">Upload product photo(s)</span>
                  <span className="text-[11px] text-gray-400">PNG, JPG, WEBP up to 5MB</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imagePreviews.length > 0 && (
                  <div className="flex gap-3 mt-3 overflow-x-auto">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-200 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 bg-black text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-neutral-800 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

