import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { motion } from 'framer-motion';

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQtyHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div style={{ minHeight: '80vh', background: '#f8fafc', padding: isMobile ? '100px 0 4rem' : '3rem 0' }}>
      <div className="container" style={{ padding: '0 1rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2rem' }}
        >
          <h1 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em' }}>
            Shopping <span style={{ color: '#6366f1' }}>Cart</span>
          </h1>
          <p style={{ color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>
            {totalItems > 0 ? `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#fff',
              borderRadius: '2rem',
              padding: '4rem 1.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #f1f5f9'
            }}
          >
            <div style={{ width: '80px', height: '80px', background: '#f5f3ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <ShoppingCart size={36} color="#6366f1" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.75rem' }}>Your cart is empty</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '1rem', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <ShoppingBag size={18} /> Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '2.1fr 1fr', 
            gap: isMobile ? '1.5rem' : '2.5rem', 
            alignItems: 'start' 
          }}>

            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item) => (
                <motion.div
                  key={item.product}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    background: '#fff',
                    borderRadius: '1.5rem',
                    padding: isMobile ? '1rem' : '1.5rem',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: isMobile ? '1rem' : '1.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    border: '1px solid #f1f5f9',
                    position: 'relative'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ 
                      width: isMobile ? '100%' : '100px', 
                      height: isMobile ? '200px' : '100px', 
                      objectFit: 'cover', 
                      borderRadius: '1rem', 
                      flexShrink: 0 
                    }}
                    onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.product}/200/200`; }}
                  />
                  <div style={{ flex: 1, width: isMobile ? '100%' : 'auto' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.25rem' }}>{item.name}</h3>
                    <p style={{ fontSize: '1.25rem', fontWeight: '900', color: '#6366f1' }}>${item.price}</p>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    width: isMobile ? '100%' : 'auto',
                    gap: '1rem',
                    borderTop: isMobile ? '1px solid #f1f5f9' : 'none',
                    paddingTop: isMobile ? '1rem' : '0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <select
                        value={item.qty}
                        onChange={(e) => updateQtyHandler(item, e.target.value)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.75rem',
                          border: '2px solid #e2e8f0',
                          background: '#f8fafc',
                          fontWeight: '800',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
                          <option key={x} value={x}>{x}</option>
                        ))}
                      </select>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromCartHandler(item.product)}
                        style={{
                          background: '#fff1f2',
                          border: 'none',
                          color: '#ef4444',
                          width: '38px',
                          height: '38px',
                          borderRadius: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Subtotal</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1a1a1a' }}>
                        ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: '#fff',
                borderRadius: '2rem',
                padding: '2rem',
                boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9',
                position: isMobile ? 'static' : 'sticky',
                top: '120px'
              }}
            >
              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#1a1a1a', marginBottom: '1.5rem' }}>Summary</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: '700', fontSize: '0.9rem' }}>
                  <span>Items ({totalItems})</span>
                  <span>${totalPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: '700', fontSize: '0.9rem' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#22c55e' }}>Calculated at next step</span>
                </div>
                <div style={{ height: '1.5px', background: '#f1f5f9', margin: '0.5rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1a1a1a', fontWeight: '900', fontSize: '1.35rem' }}>
                  <span>Total</span>
                  <span style={{ color: '#6366f1' }}>${totalPrice}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  background: '#1a1a1a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '1.25rem',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                }}
              >
                Checkout <ArrowRight size={20} />
              </motion.button>

              <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontWeight: '800', fontSize: '0.85rem', textDecoration: 'none' }}>
                Continue Browsing
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
