import { Link } from 'react-router-dom';
import StarRating from '../starrating/StarRating';
import { formatPrice, getImageUrl, calculateDiscountPrice } from '../../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const effectivePrice = calculateDiscountPrice(product.price, product.discountPercentage);
  const primaryImage = product.images && product.images.length > 0
    ? getImageUrl(product.images[0])
    : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group flex flex-col h-full">
      <Link
        to={`/product/${product._id}`}
        className="product-card-img-wrap block aspect-square w-full overflow-hidden mb-4 relative"
      >
        <img
          src={primaryImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col flex-1">
        <Link
          to={`/product/${product._id}`}
          className="font-bold text-base md:text-lg text-black mb-1 hover:text-gray-600 transition-colors line-clamp-1"
        >
          {product.title}
        </Link>

        <div className="mb-2">
          <StarRating rating={product.rating} size={15} />
        </div>

        <div className="flex items-center gap-2.5 mt-auto">
          <span className="text-lg md:text-xl font-extrabold text-black">
            {formatPrice(effectivePrice)}
          </span>

          {product.discountPercentage > 0 && (
            <>
              <span className="text-lg md:text-xl font-bold text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="product-card-discount text-xs font-bold px-2 py-0.5 rounded-full">
                -{product.discountPercentage}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

