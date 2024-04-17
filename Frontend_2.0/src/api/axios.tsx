import axios from "axios";
import { BasketItem, Product, BasketItemAPI} from "../types/types";
const BASE_URL = `http://localhost:8000/api/`;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

function getCsrfToken() {
    return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}

axiosInstance.interceptors.request.use((config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;

export const initSession = async () => {
    try {
        console.log(`Complete URL: ${BASE_URL}session/`);
        const response = await axiosInstance.post(`${BASE_URL}session/`);
        console.log("Session response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to initialize session", error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        console.log(`Complete URL: ${BASE_URL}products/`);
        const response = await axiosInstance.get(`${BASE_URL}products/`);
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
        const response = await axiosInstance.get(`${BASE_URL}products/?ids=${idsParam}`);
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
        const response = await axiosInstance.get(`${BASE_URL}products/?random_count=${amount}`);
        console.log("Random products data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch random products", error);
        throw error;
    }
}

export const fetchBasket = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}basket/`);
        console.log("Basket response:", response.data);
        console.log("Order items:", response.data.order_items)
        console.log("Order items length:", response.data.order_items.length)
        if (response.data.order_items && response.data.order_items.length > 0) {
            console.log("Basket already exists, returning items");
            return response.data;
        }
        console.log("Basket empty, filling with random products");
        const randomProducts = await fetchRandomProducts(3);
        console.log("Random products:", randomProducts);
        const items = randomProducts.map((product: Product) => ({
            string_id: product.string_id,
            quantity: 1,
            subtotal: product.price,
        }));
        const totalprice = items.reduce((sum: number, item: BasketItem) => sum + Number(item.subtotal), 0).toFixed(2);
        const postData = { items, totalprice };
        console.log("Data sent to server:", postData);
        const basket = await axiosInstance.post(`${BASE_URL}basket/update/`, postData);
        console.log("Basket updated:", basket.data);
        return basket.data.details;
    } catch (error) {
        console.error("Failed to fetch basket", error);
        throw error;
    }
}

export const updateBasket = async (items: BasketItemAPI[]) => {
    const totalprice = items.reduce((sum: number, item: BasketItemAPI) => sum + Number(item.quantity), 0).toFixed(2);
    const postData = { items, totalprice };
    try {
        const response = await axiosInstance.post(`${BASE_URL}basket/update/`, postData);
        console.log("Basket updated:", response.data);
        return response.data.details;
    } catch (error) {
        console.error("Failed to update basket", error);
        throw error;
    }
}