export interface Product {
    string_id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    image?: string;
    count: number;
    upsellProductID: string;
}

export interface BasketItem {
    product: Product;
    quantity: number;
    rebate?: number;
    subtotal: number;
}

export interface PurchaseTotal {
    total: number;
    shipping: number;
    rebate?: number;
    discount?: number;
}

export interface BillingInfo {
    firstName: string;
    lastName: string;
    address1: string;
    adress2?: string | null;
    postalCode: string;
    city: string;
    phone: string;
    email: string;
    deliveryFirstName?: string | null;
    deliveryLastName?: string | null;
    deliveryAdress?: string | null;
    deliveryPostalCode?: string | null;
    deliveryCity?: string | null;
    companyName?: string | null;
    companyVat?: string | null;
}

export interface PaymentInfo {
    paymentMethod: string;
    cardType?: string | null;
    cardNo?: string | null;
    cvv?: string | null;
    cardExpDate?: string | null;
    giftCardNumber?: string | null;
    giftCardAmount?: string | null;
}

export interface CheckoutContextType {
    basket: BasketItem[];
    setBasket: (basket: BasketItem[]) => void;
    purchaseTotal: PurchaseTotal;
    updateBasket: (updatedItem: BasketItem) => void;
    removeItemFromBasket: (itemToRemove: BasketItem) => void;
    billingInfo: BillingInfo;
    handleSetBillingInfo: (info: BillingInfo) => void;
    paymentInfo: PaymentInfo;
    handleSetPaymentInfo: (details: PaymentInfo) => void;
}
