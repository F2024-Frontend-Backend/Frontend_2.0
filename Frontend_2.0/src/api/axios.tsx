import axios from "axios";
import { BasketItem, Product, BasketItemAPI, BillingInfo, PaymentInfo, PurchaseTotal} from "../types/types";
const BASE_URL = `https://dtu62597.eduhost.dk:10212/api/`; // http://localhost:8000/api/

const axiosInstance = axios.create({
        baseURL: BASE_URL,
        withCredentials: true,
});

function getCsrfToken() {
    return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}

function getSessionCookie() {
    return document.cookie.split('; ')
        .find(row => row.startsWith('session_cookie='))
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

axiosInstance.interceptors.request.use((config) => {
    const sessionCookie = getSessionCookie();
    if (sessionCookie) {
        config.headers['Cookie'] = `session_cookie=${sessionCookie}`; 
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
        console.log("Basket items:", response.data.basket_items)
        console.log("Basket items length:", response.data.basket_items.length)

        if (response.data.basket_items && response.data.basket_items.length > 0) {
            console.log("Basket already exists, returning items");
            return response.data;
        }
        console.log("Basket empty, filling with random products");

        const randomProducts = await fetchRandomProducts(3);
        console.log("Random products:", randomProducts);

        const items = randomProducts.map((product: Product) => ({
            string_id: product.string_id,
            quantity: 1,
            sub_total: product.price,
        }));
        const totalprice = items.reduce((sum: number, item: BasketItem) => sum + Number(item.sub_total), 0).toFixed(2);
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

export const updateBasketItemQuantity = async (stringId: string, quantity: number) => {
    const postData = { string_id: stringId, quantity };
    try {
        const response = await axiosInstance.post(`${BASE_URL}basket/update/`, postData);
        console.log("Basket item updated:", response.data);
        return response.data.details;
    } catch (error) {
        console.error("Failed to update basket item quantity", error);
        throw error;
    }
}

export const submitOrder = async (billingInfo: BillingInfo, paymentInfo: PaymentInfo, purchaseTotal: PurchaseTotal) => {
    const postData = { 
        billingInfo: {
            firstName: billingInfo.firstName,
            lastName: billingInfo.lastName,
            address1: billingInfo.address1,
            address2: billingInfo.address2,
            postalCode: billingInfo.postalCode,
            city: billingInfo.city,
            phone: billingInfo.phone,
            email: billingInfo.email,
            country: billingInfo.country,
            deliveryFirstName: billingInfo.deliveryFirstName,
            deliveryLastName: billingInfo.deliveryLastName,
            deliveryAddress: billingInfo.deliveryAddress,
            deliveryPostalCode: billingInfo.deliveryPostalCode,
            deliveryCity: billingInfo.deliveryCity,
            companyName: billingInfo.companyName,
            companyVat: billingInfo.companyVat
        },
        paymentInfo: {
            paymentMethod: paymentInfo.paymentMethod
        },
        totalPrice: parseFloat(purchaseTotal.total.toFixed(2)),
        acceptMarketing: billingInfo.acceptMarketing,
        orderComment: billingInfo.orderComment
        };
    /*DUMMY DATA => 
        const postData = {
        "billingInfo": {
          "firstName": "John",
          "lastName": "Doe",
          "address1": "123 Main St",
          "address2": "Suite 101",
          "postalCode": "12345",
          "city": "Anytown",
          "phone": "1234567890",
          "email": "john.doe@example.com",
          "country": "USA",
          "deliveryFirstName": "Jane",
          "deliveryLastName": "Doe",
          "deliveryAddress": "456 Elm St",
          "deliveryPostalCode": "54321",
          "deliveryCity": "Othertown",
          "companyName": "Doe Inc.",
          "companyVat": "123456"
        },
        "paymentInfo": {
          "paymentMethod": "Credit Card"
        },
        "totalPrice": 150.00,
        "acceptMarketing": true
      };*/
    try {
        console.log("Posting order data:", postData)
        const response = await axiosInstance.post(`${BASE_URL}order/submit/`, postData);
        console.log("Order submitted:", response.data);
        const order_details = response.data;
        console.log("Order number:", order_details);
        return order_details;
    } catch (error) {
        console.error("Failed to submit order", error);
        throw error;
    }
}