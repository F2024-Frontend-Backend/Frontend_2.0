import React from 'react';

interface PaymentMethodSelectorProps {
    selectedPaymentMethod: string;
    onPaymentMethodChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isCompany: boolean;
    totalAmount: number; // Assuming you have access to the total amount
}

export const PaymentMethodSelector = ({ selectedPaymentMethod, onPaymentMethodChange, isCompany, totalAmount }: PaymentMethodSelectorProps) => {
    const paymentMethods = ['Creditcard'];

    // Disable MobilePay and Invoice if the total amount exceeds a certain threshold
    const disableMobilePay = totalAmount > THRESHOLD_AMOUNT;
    const disableInvoice = totalAmount > THRESHOLD_AMOUNT;

    return (
        <div className="selector">
            {paymentMethods.map(paymentMethod => (
                <label key={paymentMethod} className={`button ${selectedPaymentMethod === paymentMethod ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value={paymentMethod}
                        checked={selectedPaymentMethod === paymentMethod}
                        onChange={onPaymentMethodChange}
                        disabled={disableMobilePay || disableInvoice}
                    /> {paymentMethod}
                </label>
            ))}
            {!disableInvoice && isCompany && (
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Invoice"
                        checked={selectedPaymentMethod === 'Invoice'}
                        onChange={onPaymentMethodChange}
                    /> Invoice
                </label>
            )}
        </div>
    );
};

const THRESHOLD_AMOUNT = 100; // Define your threshold amount here
