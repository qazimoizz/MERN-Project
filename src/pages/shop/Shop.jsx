import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronRight, Check, X, ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from '../../components/productcard/ProductCard';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import api from '../../utils/api';
import { CATEGORIES, DRESS_STYLES, SIZES, COLORS, SORT_OPTIONS } from '../../utils/constants';
import './Shop.css';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const currentCategory = searchParams.get('category') || '';
  const currentDressStyle = searchParams.get('dressStyle') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'popular';
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentSize = searchParams.get('size') || '';
  const currentColor = searchParams.get('color') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';

  const [minPriceInput, setMinPriceInput] = useState(currentMinPrice || '0');
  const [maxPriceInput, setMaxPriceInput] = useState(currentMaxPrice || '500');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(searchParams);
        if (!params.get('limit')) params.set('limit', '9');
        const response = await api.get(`/products?${params.toString()}`);
        setProducts(response.data.products);
        setTotal(response.data.total);
        setTotalPages(response.data.pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePriceApply = () => {
    const newParams = new URLSearchParams(searchParams);
    if (minPriceInput) newParams.set('minPrice', minPriceInput);
    else newParams.delete('minPrice');

    if (maxPriceInput) newParams.set('maxPrice', maxPriceInput);
    else newParams.delete('maxPrice');

    newParams.set('page', '1');
    setSearchParams(newParams);
    setMobileFilterOpen(false);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setMinPriceInput('0');
    setMaxPriceInput('500');
    setSearchParams({});
    setMobileFilterOpen(false);
  };

  const filterSidebarContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-black">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-xs text-gray-500 hover:text-black font-semibold underline underline-offset-2"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-3 pb-6 border-b border-gray-100">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => updateFilter('category', isActive ? '' : cat)}
              className={`w-full flex items-center justify-between text-sm py-1.5 transition-colors ${
                isActive ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              <span>{cat}</span>
              <ChevronRight size={16} className={isActive ? 'text-black' : 'text-gray-400'} />
            </button>
          );
        })}
      </div>

      <div className="pb-6 border-b border-gray-100">
        <h4 className="font-bold text-base text-black mb-4">Price</h4>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <span className="text-xs text-gray-400 block mb-1">Min ($)</span>
            <input
              type="number"
              min="0"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-black"
            />
          </div>
          <span className="text-gray-400 mt-5">-</span>
          <div className="flex-1">
            <span className="text-xs text-gray-400 block mb-1">Max ($)</span>
            <input
              type="number"
              min="0"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      <div className="pb-6 border-b border-gray-100">
        <h4 className="font-bold text-base text-black mb-4">Colors</h4>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((col) => {
            const isSelected = currentColor.toLowerCase() === col.name.toLowerCase();
            return (
              <button
                key={col.name}
                onClick={() => updateFilter('color', isSelected ? '' : col.name)}
                style={{ backgroundColor: col.hex }}
                className={`color-swatch relative ${col.border ? 'border border-gray-300' : ''}`}
                title={col.name}
              >
                {isSelected && (
                  <Check
                    size={16}
                    className={col.name.toLowerCase() === 'white' ? 'text-black' : 'text-white'}
                    strokeWidth={3}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pb-6 border-b border-gray-100">
        <h4 className="font-bold text-base text-black mb-4">Size</h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((sz) => {
            const isSelected = currentSize.toLowerCase() === sz.toLowerCase();
            return (
              <button
                key={sz}
                onClick={() => updateFilter('size', isSelected ? '' : sz)}
                className={`size-pill ${isSelected ? 'active' : ''}`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pb-6 border-b border-gray-100">
        <h4 className="font-bold text-base text-black mb-4">Dress Style</h4>
        <div className="space-y-3">
          {DRESS_STYLES.map((style) => {
            const isActive = currentDressStyle.toLowerCase() === style.toLowerCase();
            return (
              <button
                key={style}
                onClick={() => updateFilter('dressStyle', isActive ? '' : style)}
                className={`w-full flex items-center justify-between text-sm py-1.5 transition-colors ${
                  isActive ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
                }`}
              >
                <span>{style}</span>
                <ChevronRight size={16} className={isActive ? 'text-black' : 'text-gray-400'} />
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handlePriceApply}
        className="w-full py-3.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
      >
        Apply Filter
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <Breadcrumbs
        items={[
          { label: 'Shop', link: '/shop' },
          ...(currentDressStyle ? [{ label: currentDressStyle, link: `/shop?dressStyle=${currentDressStyle}` }] : []),
          ...(currentCategory ? [{ label: currentCategory }] : [])
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="filter-sidebar p-6 bg-white sticky top-24">
            {filterSidebarContent}
          </div>
        </aside>

        <main className="lg:col-span-9">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-black uppercase font-integral">
                {currentCategory || currentDressStyle || (currentSearch ? `Search: "${currentSearch}"` : 'Casual')}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Showing {products.length > 0 ? (currentPage - 1) * 9 + 1 : 0}-{Math.min(currentPage * 9, total)} of {total} Products
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="hidden sm:inline">Sort by:</span>
                <select
                  value={currentSort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="bg-transparent font-semibold text-black outline-none border-none cursor-pointer text-sm"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden p-2.5 bg-gray-100 rounded-full text-black hover:bg-gray-200 transition-colors"
                aria-label="Open filters"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          {(currentCategory || currentDressStyle || currentSize || currentColor || currentSearch) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {currentCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-black">
                  Category: {currentCategory}
                  <button onClick={() => updateFilter('category', '')}><X size={14} /></button>
                </span>
              )}
              {currentDressStyle && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-black">
                  Style: {currentDressStyle}
                  <button onClick={() => updateFilter('dressStyle', '')}><X size={14} /></button>
                </span>
              )}
              {currentSize && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-black">
                  Size: {currentSize}
                  <button onClick={() => updateFilter('size', '')}><X size={14} /></button>
                </span>
              )}
              {currentColor && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-black">
                  Color: {currentColor}
                  <button onClick={() => updateFilter('color', '')}><X size={14} /></button>
                </span>
              )}
              {currentSearch && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-black">
                  Search: {currentSearch}
                  <button onClick={() => updateFilter('search', '')}><X size={14} /></button>
                </span>
              )}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <h3 className="text-lg font-bold text-black mb-2">No Products Found</h3>
              <p className="text-sm text-gray-500 mb-6">Try adjusting your filters or search query.</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-10 mt-10 border-t border-gray-100">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="pagination-btn flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => handlePageChange(pNum)}
                      className={`page-number-btn ${currentPage === pNum ? 'active' : ''}`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="pagination-btn flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </main>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          ></div>
          <div className="relative ml-auto w-full max-w-xs bg-white h-full overflow-y-auto p-6 shadow-2xl z-10 custom-scrollbar">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <span className="font-bold text-lg">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                <X size={20} />
              </button>
            </div>
            {filterSidebarContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;

