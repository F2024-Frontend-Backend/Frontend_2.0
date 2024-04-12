export interface Product {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    imageUrl?: string;
    count: number;
    upsellProductId: string;
}

export interface BasketItem {
    product: Product;
    quantity: number;
    subtotal: number;
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
    updateBasket: (updatedItem: BasketItem) => void;
    removeItemFromBasket: (itemToRemove: BasketItem) => void;
    billingInfo: BillingInfo;
    handleSetBillingInfo: (info: BillingInfo) => void;
    paymentInfo: PaymentInfo;
    handleSetPaymentInfo: (details: PaymentInfo) => void;
}