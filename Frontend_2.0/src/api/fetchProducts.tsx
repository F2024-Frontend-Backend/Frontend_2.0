import axios from "axios";
import { BasketItem, Product } from "../types/types";

export const fetchProducts = async (): Promise<BasketItem[]> => {
    try {
        const response = await axios.get("https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json");
        const products: Product[] = response.data;

        const basketItems: BasketItem[] = products.map(product => ({
            product: product,
            quantity: 1,
            sub_total: product.price
        }));

        return basketItems;
    } catch (error) {
        console.error("Failed to fetch products", error);
        throw error;
    }
};

//This functions needs to be refactored when the API is ready, should be able to fetch multiple products at once with a given array of ids
export const fetchUpsellProducts = async (upsellIds: string[]): Promise<Product[]> => {
    try {
        const response = await axios.get("https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json");
        const products: Product[] = response.data;

        const upsellProducts = products.filter(product => upsellIds.includes(product.string_id));

        return upsellProducts;
    } catch (error) {
        console.error("Failed to fetch upsell products", error);
        throw error;
    }
}

export const fetchRandomProducts = async (amount: number): Promise<Product[]> => {
    try {
        const response = await axios.get("https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json");
        const products: Product[] = response.data;

        const randomProducts = products.sort(() => Math.random() - 0.5).slice(0, amount);

        return randomProducts;
    } catch (error) {
        console.error("Failed to fetch random products", error);
        throw error;
    }
}