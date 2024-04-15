import axios from "axios";
const BASE_URL = `http://localhost:8000/api/`;

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const fetchProducts = async () => {
    try {
        console.log(`Complete URL: ${BASE_URL}products/`);
        const response = await axios.get(`${BASE_URL}products/`);
        console.log("Full API Response:", response);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products", error);
        throw error;
    }
}

export const fetchUpsellProducts = async (upsellIds: string[]) => {
    const idsParam = upsellIds.join(',');
    console.log(`Fetching upsell products with IDs: ${idsParam}`);
    try {
        console.log(`Complete URL: ${BASE_URL}products/?ids=${idsParam}`);
        const response = await axios.get(`${BASE_URL}products/?ids=${idsParam}`);
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch upsell products", error);
        throw error;
    }
}

export const fetchRandomProducts = async (amount: number) => {
    console.log(`Fetching ${amount} random products`);
    try {
        console.log(`Complete URL: ${BASE_URL}products/?ids=${amount}`);
        const response = await axios.get(`${BASE_URL}products/?random_count=${amount}`);
        console.log("Random products data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch random products", error);
        throw error;
    }
}

export const fetchBasket = async () => {
    try {
        const response = await axios.get(`${BASE_URL}session/`);
        if (response.data.session === "existing"){
            console.log("Existing session:", response.data.details);
            return response.data.details;
        } else {
            console.log("New session created, filling basket with random products");
            const randomProducts = await fetchRandomProducts(3);
            await axios.post(`${BASE_URL}basket/`, randomProducts);
            return randomProducts;
        }
    } catch (error) {
        console.error("Failed to fetch basket", error);
        throw error;
    }
}
