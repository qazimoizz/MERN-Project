import { createContext, useContext, useState, useEffect } from 'react';
import { calculateDiscountPrice } from '../utils/helpers';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('shopco_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountPercentage, setPromoDiscountPercentage] = useState(0);

  useEffect(() => {
    localStorage.setItem('shopco_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, color, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product._id === product._id &&
          item.size === size &&
          item.color.name === color.name
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const effectivePrice = calculateDiscountPrice(product.price, product.discountPercentage);
        return [
          ...prevItems,
          {
            product,
            size,
            color,
            quantity,
            price: effectivePrice,
            originalPrice: product.price,
            discountPercentage: product.discountPercentage || 0
          }
        ];
      }
    });
  };

  const removeFromCart = (productId, size, colorName) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product._id === productId &&
            item.size === size &&
            item.color.name === colorName
          )
      )
    );
  };

  const updateQuantity = (productId, size, colorName, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorName);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (
          item.product._id === productId &&
          item.size === size &&
          item.color.name === colorName
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setPromoDiscountPercentage(0);
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SHOP20') {
      setPromoDiscountPercentage(20);
      setPromoCode('SHOP20');
      return { success: true, message: '20% promo code applied successfully!' };
    } else if (cleanCode === 'SAVE10') {
      setPromoDiscountPercentage(10);
      setPromoCode('SAVE10');
      return { success: true, message: '10% promo code applied successfully!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try SHOP20' };
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );

  const discountedSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const productDiscount = subtotal - discountedSubtotal;

  const promoDiscountAmount = Math.round((discountedSubtotal * promoDiscountPercentage) / 100);

  const totalDiscount = productDiscount + promoDiscountAmount;

  const deliveryFee = cartItems.length > 0 ? (discountedSubtotal > 200 ? 0 : 15) : 0;

  const totalPrice = Math.max(0, discountedSubtotal - promoDiscountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        totalDiscount,
        promoDiscountAmount,
        promoCode,
        promoDiscountPercentage,
        applyPromoCode,
        deliveryFee,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

