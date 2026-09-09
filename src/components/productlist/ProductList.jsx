import { Link } from 'react-router-dom';
import ProductCard from '../productcard/ProductCard';
import './ProductList.css';

const ProductList = ({ title, products = [], viewAllLink = '/shop', showDivider = true, loading = false }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-black uppercase tracking-tight mb-8 md:mb-12 font-integral">
          {title}
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No products available in this section.
          </div>
        )}

        <div className="text-center mt-9 md:mt-12">
          <Link
            to={viewAllLink}
            className="product-list-btn inline-block px-12 md:px-16 py-3.5 rounded-full text-sm sm:text-base font-semibold text-black transition-all"
          >
            View All
          </Link>
        </div>

        {showDivider && <div className="border-b section-divider mt-16 md:mt-20"></div>}
      </div>
    </section>
  );
};

export default ProductList;

