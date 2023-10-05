export default function FilterOption({ filterOption, setFilterOption }) {
    function handleFilterOptionChange (event) {
        setFilterOption(event.target.value);
    };
    
  return (
    <div className="flex justify-center items-start gap-5 border rounded-2xl p-2">
      <label htmlFor="filterOption">Filtrar por:</label>
      <select
        id="filterOption"
        value={filterOption}
        onChange={handleFilterOptionChange}
      >
        <option value="name" className="bg-transparent">
          Nombre
        </option>
        <option value="briefDesc" className="bg-transparent">
          Descripción
        </option>
      </select>
    </div>
  );
}
