export default function CategorySelect({ categories, setSelectedCategory }) {
    function handleChangeCategory (category) {
      setSelectedCategory(category);
    };
  
    function handleChange (event) {
      const selectedCategory = event.target.value;
      handleChangeCategory(selectedCategory);
    };
  
    return (
      <div className="flex text-xs items-center px-2 gap-[8px] border rounded-2xl">
        <label htmlFor="categorySelect">Selecciona una categoría:</label>
        <select id="categorySelect" onChange={handleChange} className="p-2 rounded-lg">
          <option value="" className="bg-transparent">Todas las categorías</option>
          {categories.map((category, index) => (
            <option key={index} value={category} className="bg-transparent">
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  }