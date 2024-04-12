import axios from "axios";
import { BasketItem, Product } from "../types/types";

export const fetchProducts = async (): Promise<BasketItem[]> => {
    try {
        const response = await axios.get("https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json");
        const products: Product[] = response.data;

        const basketItems: BasketItem[] = products.map(product => ({
            product: product,
            quantity: 1,
            subtotal: product.price
        }));

        return basketItems;
    } catch (error) {
        console.error("Failed to fetch products", error);
        throw error;
    }
};