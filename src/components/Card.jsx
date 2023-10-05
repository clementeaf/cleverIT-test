import React, { useState } from "react";
import useCartStore from "../stores/useCartStore";

export default function Card({ id, name, price, briefDesc, image, handleNotification }) {
  const [count, setCount] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  function handleCountDown() {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  }
  
  function handleCountUp() {
    setCount((prevCount) => prevCount + 1);
  }

  function handleAddToCart() {
    if (count > 0) {
      addToCart({ id, name, price, quantity: count });
      handleNotification();
      setCount(1);
    }
  }

  return (
    <div className="flex flex-col w-[250px] h-[350px] rounded-2xl shadow-xl">
      <div className="flex w-full h-[50%] justify-center items-center border-gray-500 border-b-[1px]">
        <img
          src={image}
          alt="product image"
          width={100}
        />
      </div>
      <div className="flex flex-col justify-start items-start px-4 pt-2">
        <p className="text-sm font-semibold">Nombre Prod: {name}</p>
        <p className="text-sm font-semibold">Precio: ${price}</p>
        <p className="text-sm font-semibold">Descripción breve</p>
        <div className="w-full min-h-[85px]">
          <p className="text-sm text-justify pr-4">{briefDesc}</p>
        </div>
      </div>
      <div className="flex items-center place-self-end mr-4 mb-2 gap-4">
        <div className="flex items-center gap-2">
          <button onClick={handleCountDown} className={`${count === 1 && 'text-gray-300'}`}>
            -
          </button>
          {count}
          <button onClick={handleCountUp}>+</button>
        </div>
        <button
          className="text-sm font-light text-gray-500 hover:text-gray-900 ease-in-out duration-300"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
