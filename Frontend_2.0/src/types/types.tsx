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
    sub_total: number;
}

export type BasketItemAPI = {
    string_id: string;
    quantity: number;
};

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
  address2?: string | null;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  country: string;
  deliveryFirstName?: string | null;
  deliveryLastName?: string | null;
  deliveryAddress?: string | null;
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
  mobilePayNumber?: string | null;
}

export interface CheckoutContextType {
    purchaseTotal: PurchaseTotal;
    billingInfo: BillingInfo;
    handleSetBillingInfo: (info: BillingInfo) => void;
    paymentInfo: PaymentInfo;
    handleSetPaymentInfo: (details: PaymentInfo) => void;
}

export interface BasketContextType {
    basket: BasketItem[];
    setBasket: (basket: BasketItem[]) => void;
    updateItemInBasket: (updatedItem: BasketItem) => void;
    removeItemFromBasket: (itemToRemove: BasketItem) => void;
}


export interface OrderResponseContextType {
  orderResponse: OrderResponse;
  setOrderResponse: (orderResponse: OrderResponse) => void;
}

export interface OrderResponse {
  order_number: string;
  order_total: number;
  order_shipping: number;
  order_rebate: number;
  order_discount: number;
  order_items: BasketItem[];
}
