import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) => {
    set((state) => {
      // Verifica si el producto ya existe en el carrito
      const existingProduct = state.cart.find((p) => p.id === product.id);

      if (existingProduct) {
        // Si existe, actualiza la cantidad
        const updatedCart = state.cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
        );

        return { cart: updatedCart };
      } else {
        // Si no existe, agrega el producto al carrito
        return { cart: [...state.cart, product] };
      }
    });
  },
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
    updateCartItemQuantity: (productId, newQuantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ),
    })),
    emptyCart: () =>
    set({
      cart: [], //Vacía todo el contenido del carrito
    }),
}));

export default useCartStore;
