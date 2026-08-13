'use client'

import { useState } from 'react';
import { useCart, CartItem } from './CartProvider';

export default function AddToCartButton({ 
  product, 
  variant 
}: { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variant: any 
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const item: CartItem = {
      variant_id: variant.id,
      product_id: product.id,
      name: product.name,
      price: product.base_price,
      image_url: product.image_url,
      size: variant.size,
      color: variant.color,
      quantity: 1
    };
    
    addToCart(item);
    setAdded(true);
    
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <button 
      className="btn btn-gold" 
      style={{ width: '100%', padding: '16px', fontSize: '18px' }}
      onClick={handleAdd}
      disabled={added}
    >
      {added ? 'Added to Cart ✓' : 'Add to Cart'}
    </button>
  );
}
