import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Check, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import StarRating from '../../components/starrating/StarRating';
import ProductCard from '../../components/productcard/ProductCard';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { formatPrice, getImageUrl, calculateDiscountPrice } from '../../utils/helpers';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }
        if (res.data.colors && res.data.colors.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }
        setSelectedImage(0);
        setQuantity(1);

        const relatedRes = await api.get(`/products?category=${encodeURIComponent(res.data.category)}&limit=4`);
        const filtered = relatedRes.data.products.filter((p) => p._id !== res.data._id);
        setRelatedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmittingReview(true);
      const res = await api.post(`/products/${id}/reviews`, {
        rating: newRating,
        comment: newComment
      });
      setProduct(res.data.product);
      setReviewModalOpen(false);
      setNewComment('');
      setNewRating(5);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review. Please sign in first.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="px-6 py-2.5 bg-black text-white rounded-full font-semibold">
          Back to Shop
        </Link>
      </div>
    );
  }

  const effectivePrice = calculateDiscountPrice(product.price, product.discountPercentage);
  const images = product.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs
        items={[
          { label: 'Shop', link: '/shop' },
          { label: product.category, link: `/shop?category=${encodeURIComponent(product.category)}` },
          { label: product.title }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 pb-16">
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3.5 overflow-x-auto sm:overflow-visible shrink-0 sm:w-28">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`detail-img-thumb w-20 sm:w-full aspect-square overflow-hidden shrink-0 ${
                  selectedImage === idx ? 'active' : ''
                }`}
              >
                <img
                  src={getImageUrl(img)}
                  alt={`${product.title} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="detail-img-main flex-1 aspect-square overflow-hidden">
            <img
              src={getImageUrl(images[selectedImage])}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-black text-black uppercase font-integral tracking-tight mb-3">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} size={18} />
            <span className="text-xs text-gray-500">
              ({product.ratingCount || 0} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-black">
              {formatPrice(effectivePrice)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-2xl sm:text-3xl font-bold text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full text-red-500 bg-red-50">
                  -{product.discountPercentage}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed pb-6 border-b border-gray-100">
            {product.description}
          </p>

          <div className="py-6 border-b border-gray-100">
            <span className="text-xs sm:text-sm text-gray-500 font-medium block mb-3">
              Select Colors
            </span>
            <div className="flex items-center gap-3">
              {product.colors && product.colors.map((c) => {
                const isSelected = selectedColor?.name === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c.hex }}
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 transition-transform hover:scale-105"
                    title={c.name}
                  >
                    {isSelected && (
                      <Check
                        size={18}
                        className={c.name.toLowerCase() === 'white' ? 'text-black' : 'text-white'}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="py-6 border-b border-gray-100">
            <span className="text-xs sm:text-sm text-gray-500 font-medium block mb-3">
              Choose Size
            </span>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes && product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    selectedSize === sz
                      ? 'bg-black text-white font-semibold'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 flex items-center gap-4">
            <div className="qty-pill flex items-center justify-between px-5 py-3 w-36">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-black hover:opacity-75 transition-opacity"
              >
                <Minus size={18} />
              </button>
              <span className="font-bold text-sm text-black">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-black hover:opacity-75 transition-opacity"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 bg-black text-white font-semibold text-sm sm:text-base rounded-full hover:bg-neutral-800 transition-all shadow-sm"
            >
              Add to Cart
            </button>
          </div>

          {addedNotice && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm rounded-xl text-center font-medium animate-fadeIn">
              Added to your bag!{' '}
              <Link to="/cart" className="underline font-bold">
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-around border-b border-gray-200 text-sm sm:text-base mb-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`tab-btn flex-1 text-center ${activeTab === 'details' ? 'active' : ''}`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`tab-btn flex-1 text-center ${activeTab === 'reviews' ? 'active' : ''}`}
          >
            Rating & Reviews
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`tab-btn flex-1 text-center ${activeTab === 'faqs' ? 'active' : ''}`}
          >
            FAQs
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="max-w-3xl mx-auto py-6 space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            <h3 className="font-bold text-lg text-black mb-2">Specifications</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Category: {product.category}</li>
              <li>Dress Style: {product.dressStyle}</li>
              <li>Material: 100% Organic Ring-Spun Cotton</li>
              <li>Fit Type: Modern Tailored Fit</li>
              <li>Care Instructions: Machine wash cold with like colors, tumble dry low</li>
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-black">All Reviews</h3>
                <span className="text-xs sm:text-sm text-gray-500">
                  ({product.reviews?.length || 0})
                </span>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Write a Review
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, index) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-2xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <StarRating rating={rev.rating} size={16} showScore={false} />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-base text-black">{rev.name}</span>
                      {rev.verified && (
                        <span className="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px]">
                          <Check size={10} strokeWidth={3} />
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      "{rev.comment}"
                    </p>

                    <span className="text-xs text-gray-400">
                      Posted on {new Date(rev.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-500">
                  No reviews yet. Be the first to review this product!
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="max-w-3xl mx-auto py-6 space-y-4 text-sm sm:text-base">
            <div className="p-5 border border-gray-200 rounded-xl">
              <h4 className="font-bold text-black mb-2">What is the return policy?</h4>
              <p className="text-gray-600">We offer a 30-day hassle-free return and exchange guarantee on all unwashed items with tags attached.</p>
            </div>
            <div className="p-5 border border-gray-200 rounded-xl">
              <h4 className="font-bold text-black mb-2">How long does shipping take?</h4>
              <p className="text-gray-600">Standard domestic delivery takes 3-5 business days. Express shipping options are available at checkout.</p>
            </div>
            <div className="p-5 border border-gray-200 rounded-xl">
              <h4 className="font-bold text-black mb-2">How do I choose my size?</h4>
              <p className="text-gray-600">Our garments follow standard international sizing. Refer to the size options provided on this page for accurate measurements.</p>
            </div>
          </div>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-3xl sm:text-4xl font-black text-center text-black uppercase tracking-tight mb-10 font-integral">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-black mb-4">Write a Customer Review</h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Rating
                </label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Poor</option>
                  <option value={1}>1 Star - Terrible</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Experience & Feedback
                </label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share details about the fit, material quality, and how it looks..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-black"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-5 py-2 border border-gray-200 rounded-full text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 disabled:opacity-50"
                >
                  {submittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

