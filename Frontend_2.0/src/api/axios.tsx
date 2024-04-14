import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/";

export default axios.create({
    baseURL: BASE_URL,
});

export const fetchProducts = async () => {
    try {
        const response = await axios.get("products/");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products", error);
        throw error;
    }
}

export const fetchUpsellProducts = async (upsellIds: string[]) => {
    try {
        const idsParam = upsellIds.join(',');
        const response = await axios.get(`products/?ids=${idsParam}`);
        const products = response.data;
        return products;
    } catch (error) {
        console.error("Failed to fetch upsell products", error);
        throw error;
    }
}

export const fetchRandomProducts = async (amount: number) => {
    try {
        const countParam = amount.toString();
        const response = await axios.get(`products/?random_count=${countParam}`);
        const products = response.data;
        const randomProducts = products.sort(() => Math.random() - 0.5).slice(0, amount);
        return randomProducts;
    } catch (error) {
        console.error("Failed to fetch random products", error);
        throw error;
    }
}