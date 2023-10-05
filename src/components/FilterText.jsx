export default function FilterText({ filterText, setFilterText }) {
    function handleFilterTextChange (event) {
        setFilterText(event.target.value);
    };
    
  return (
    <div className="flex justify-center items-start gap-5 border rounded-2xl p-2">
      <label htmlFor="filterText">Texto de filtro:</label>
      <input
        type="text"
        id="filterText"
        value={filterText}
        onChange={handleFilterTextChange}
        className="bg-transparent border-b border-gray-600/30"
      />
    </div>
  );
}
