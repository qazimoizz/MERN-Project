import { Star, StarHalf } from 'lucide-react';
import './StarRating.css';

const StarRating = ({ rating = 0, size = 16, showScore = true }) => {
  const normalizedRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating - fullStars >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="star-filled fill-current"
          />
        ))}

        {hasHalfStar && (
          <StarHalf
            key="half"
            size={size}
            className="star-filled fill-current"
          />
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            className="star-empty"
          />
        ))}
      </div>

      {showScore && (
        <span className="text-xs text-gray-500 font-medium">
          {normalizedRating.toFixed(1)}/5
        </span>
      )}
    </div>
  );
};

export default StarRating;

