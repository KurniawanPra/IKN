"use client";

import { useCart } from "./providers/cart-provider";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-[#060e1a]/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0a1628]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rubber-red" />
                <span className="font-semibold text-[#f0f0ec]">Keranjang Belanja</span>
                <span className="bg-rubber-red text-white text-xs px-2 py-0.5 rounded-full font-mono">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-steel hover:text-[#f0f0ec] p-1 transition"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-16 h-16 text-steel/20 mb-4 stroke-[1.5]" />
                  <p className="text-off-white font-medium">Keranjang Anda Kosong</p>
                  <p className="text-xs text-steel mt-1 max-w-[200px]">
                    Silakan tambahkan produk unggulan Nusantara Rubber Industry ke keranjang Anda.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 text-sm text-rubber-red hover:underline font-medium"
                  >
                    Kembali Belanja
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.product.slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 bg-white/5 border border-white/5 p-4 rounded-sm"
                  >
                    <div className="flex-1">
                      <p className="text-xs text-rubber-red font-mono uppercase">
                        {item.product.category}
                      </p>
                      <h4 className="font-medium text-[#f0f0ec] text-sm mt-0.5">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-steel mt-1">
                        {formatPrice(item.product.price)} / {item.product.unit}
                      </p>
                      
                      {/* Quantity Selector & Remove Button */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-white/10 rounded-sm bg-black/20">
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                            className="p-1.5 text-steel hover:text-white transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono text-[#f0f0ec]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                            className="p-1.5 text-steel hover:text-white transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.slug)}
                          className="text-steel-dark hover:text-red-400 p-1.5 transition"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-right flex flex-col justify-between items-end">
                      <span className="text-sm font-semibold text-[#f0f0ec] font-mono">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-[#060e1a]/80 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-steel">Total Pembayaran</span>
                  <span className="text-xl font-bold text-[#f0f0ec] font-mono">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full btn-primary bg-rubber-red text-white py-3 rounded-sm font-medium tracking-wide uppercase hover:bg-rubber-red-light transition text-sm flex items-center justify-center"
                  >
                    Lanjutkan ke Checkout
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-center text-xs text-steel hover:text-off-white py-1 transition"
                  >
                    Lanjutkan Belanja
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
