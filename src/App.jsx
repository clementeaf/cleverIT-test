import {BsCart} from "react-icons/bs"
import { useState } from "react";
import Card from "./components/Card"
import Cart from "./components/Cart"
import FilterOption from "./components/FilterOption";
import FilterText from "./components/FilterText";
import CategorySelect from "./components/CategorySelect";
import useCartStore from "./stores/useCartStore";
import useProductsQuery from "./hooks/useProductsQuery";

function App() {
  const productsQuery = useProductsQuery();
  const {data, isLoading, isError, error} = productsQuery;

  const cart = useCartStore((state) => state.cart) || [];
  const openCart = useCartStore((state) => state.openCart);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterOption, setFilterOption] = useState('name');
  const [filterText, setFilterText] = useState('');
  const [notification, setNotification] = useState(false);

  function handleNotification () {
    setNotification(!notification);
  }

  if(isLoading) return <div>Loading...</div>

  if(isError) return <div>Error: {error}</div>

  const uniqueCategories = [...new Set(data.map(product => product.category))];

  const handleCart = () => {
    useCartStore.setState({ openCart: !openCart });
  };

  const filteredProductsByCategory = selectedCategory
    ? data.filter((product) => product.category === selectedCategory)
    : data;

  const filteredProducts = filteredProductsByCategory.filter((product) => {
    if (filterOption === 'name') {
      return product.name.toLowerCase().includes(filterText.toLowerCase());
    } else if (filterOption === 'briefDesc') {
      return product.briefDesc.toLowerCase().includes(filterText.toLowerCase());
    }
    return true;
  });

  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <div className="flex flex-col h-[100vh] w-full justify-center items-center bg-gray-50">
      <div className="flex justify-center items-center gap-20 my-5">
        <h1>CleverIt Ecommerce Test</h1>
        <button onClick={handleCart}>
          <BsCart />
          {totalQuantity > 0 && (
            <div className="absolute w-5 h-5 top-6 ml-4 p-1 rounded-full text-xs flex justify-center items-center bg-black text-white">
              {totalQuantity}
            </div>
          )}
        </button>

      </div>
      
      <div className="flex items-center flex-wrap gap-5 pl-5">
      <CategorySelect
        categories={uniqueCategories}
        setSelectedCategory={setSelectedCategory}
      />
        <div className="flex flex-wrap text-xs items-center gap-5">
          <FilterOption
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />
          <FilterText
            filterText={filterText}
            setFilterText={setFilterText}
          />
        </div>
      </div>
      
      <div className="flex mt-10 w-[80%] h-[80%] items-center p-4 flex-wrap gap-10 overflow-y-scroll no-scrollbar">
        {filteredProducts.map(({ id, name, price, briefDesc, image }) => (
          <Card 
            key={id} 
            id={id}
            name={name} 
            price={price} 
            briefDesc={briefDesc}
            image={image}
            handleNotification={handleNotification}
             />
        ))}
      </div>
      {openCart && <Cart closeCart={handleCart} />}
      {notification && <ProductAddedToCart handleNotification={handleNotification}/>}
    </div>
  );
}

function ProductAddedToCart({handleNotification}) {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-blue-200/40">
      <div className="flex flex-col justify-center items-center bg-white rounded-xl p-4">
      <p>Producto agregado al carro de compras!</p>
      <button
        className="flex justify-center items-center rounded-lg hover:rounded-2xl text-white bg-blue-600 ease-in-out duration-300 shadow-xl hover:shadow-sm p-2"  
        onClick={handleNotification}>Cerrar</button>
    </div>
    </div>
  )
}

export default App
