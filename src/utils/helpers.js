export const formatPrice = (price) => {
  const num = Number(price) || 0;
  return `$${num.toFixed(0)}`;
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';
  }
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  return `${backendUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

export const calculateDiscountPrice = (price, discountPercentage) => {
  const original = Number(price) || 0;
  const discount = Number(discountPercentage) || 0;
  if (discount <= 0) return original;
  return Math.round(original - (original * discount) / 100);
};

