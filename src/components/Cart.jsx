import { AiOutlineClose } from "react-icons/ai";
import useCartStore from "../stores/useCartStore";
import { useState } from "react";

export default function Cart({ closeCart }) {
  const cart = useCartStore((state) => state.cart) || [];
  const [success, setSuccess] = useState(false);

  function handleSuccess () {
    setSuccess(!success);
  };

  //Definición para vaciar carro de compra
  const emptyCart = useCartStore((state) => state.emptyCart);

  //Definición para actualizar cantidad de un producto determinado en el carro
  const updateCartItemQuantity = useCartStore((state) => state.updateCartItemQuantity);

  // Disminuir cantidad de producto o retirarlo si llega a cero
  function handleCountDown(id, quantity) {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      updateCartItemQuantity(id, newQuantity);
    }
  };
  
  function handleCountUp(id, quantity) {
    const newQuantity = quantity + 1;
    updateCartItemQuantity(id, newQuantity);
  };

  //Cantidad total de elementos en el carro de compra
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

   // Total monetario de la compra
  const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="absolute flex justify-center items-start h-full w-full top-0 left-0 right-0 bottom-0 bg-blue-300/50">
      <div className="bg-white p-4 rounded-xl shadow-2xl mt-14 ">
        <div className="flex w-full justify-between items-center mb-4 gap-10">
          <h1>Productos en el carro</h1>
          <button onClick={closeCart} className="hover:scale-y-125 hover:scale-x-125 ease-in-out duration-300"><AiOutlineClose /></button>
        </div>
        <p className="mb-2">Cantidad: {totalQuantity} productos en el carrito</p>

        <div className="flex flex-col justify-center items-center mt-2 gap-2 p-4">
        {cart.length > 0 && (
            <table className="w-full">
                <thead>
                    <tr>
                    <th className="pr-5">Producto</th>
                    <th className="pr-5">Cantidad</th>
                    <th className="pr-5">Precio</th>
                    </tr>
                </thead>
                <tbody>
                {cart
                  .filter((product) => product.quantity > 0) // Filtrar productos con cantidad > 0
                  .map(({ id, name, price, quantity }) => (
                    <tr key={id}>
                      <td>{name}</td>
                      <td className="flex gap-5">
                        <button onClick={() => handleCountDown(id, quantity)}>-</button>
                        {quantity}
                        <button onClick={() => handleCountUp(id, quantity)}>+</button>
                      </td>
                      <td>${price * quantity}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
        )}
        </div>

        <div className="flex w-full justify-between items-center mt-4">
          <button 
            onClick={emptyCart} 
            className="flex justify-center items-center rounded-lg border border-gray hover:rounded-2xl ease-in-out duration-300 shadow-xl hover:shadow-sm p-2">
              Vaciar Carro
          </button>
          <p>Total: ${total}</p>
          <button
              className="flex justify-center items-center rounded-lg hover:rounded-2xl text-white bg-blue-600 ease-in-out duration-300 shadow-xl hover:shadow-sm p-2"
              onClick={handleSuccess}
          >
            Pagar
          </button>
        </div>
      </div>
      {success && <SuccessPaid handleSuccess={handleSuccess} closeCart={closeCart} emptyCart={emptyCart}/>}
    </div>
  );
}


function SuccessPaid({handleSuccess, closeCart, emptyCart}) {
  const handleClick = () => {
    emptyCart && emptyCart();
    handleSuccess && handleSuccess();
    closeCart && closeCart();
  };
  return (
      <div className="absolute flex flex-col justify-center items-center gap-3 bg-white place-self-center p-4 rounded-xl">
        <p>Compra exitosa!</p>
        <button 
          className="flex justify-center items-center rounded-lg hover:rounded-2xl text-white bg-blue-600 ease-in-out duration-300 shadow-xl hover:shadow-sm p-2" 
          onClick={handleClick}>Cerrar</button>
      </div>
  )
}