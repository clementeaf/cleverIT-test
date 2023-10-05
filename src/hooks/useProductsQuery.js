import axios from 'axios';
import { useQuery } from 'react-query'

export default function useProductsQuery() {
    async function fetchProducts() {
        const url = "https://clever-it-api.onrender.com/api/json"
        const response = await axios.get(url);
        return response.data;
    }
    return useQuery({
        queryKey: ["products"],
        queryFn: () => fetchProducts(),
      });
}
