import React, { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import { CardSelector, PaymentMethodSelector } from "./payment_components/Card_selector";
import { isValidCardNumber, isValidDate, isValidCvv } from "./payment_components/CardUtils";

interface Errors {
    cardNo?: string;
    cardExpDate?: string;
    cvv?: string;
}

const PaymentForm: React.FC = () => {
    const { paymentInfo, handleSetPaymentInfo } = useCheckout();
    const { billingInfo } = useCheckout();
    const navigate = useNavigate();

    const [errors, setErrors] = useState<Errors>({});

    const validateForm = () => {
        const newErrors: Errors = {};
        const cardNumberValidationResult = isValidCardNumber(paymentInfo.cardNo || '');
        if (cardNumberValidationResult !== true) {
            newErrors.cardNo = cardNumberValidationResult.message;
        } else {
            delete newErrors.cardNo;
        }
        
        if (!isValidDate(paymentInfo.cardExpDate || '')) {
            newErrors.cardExpDate = 'Invalid expiration date';
        } else {
            delete newErrors.cardExpDate;
        }
    
        if (!isValidCvv(paymentInfo.cvv || '')) {
            newErrors.cvv = 'Invalid CVV';
        } else {
            delete newErrors.cvv;
        }
        setErrors(newErrors);
    };
    
    useEffect(() => {
        validateForm();
    }, [paymentInfo]);

    const handleContinue = () => {
        if (Object.keys(errors).length === 0) {
            navigate('/checkout/confirmation');
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        handleSetPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, '');
        const parts = [];
        for (let i = 0; i < value.length; i += 4) {
            parts.push(value.substring(i, i + 4));
        }
        value = parts.join(' ');
        handleSetPaymentInfo({ ...paymentInfo, cardNo: value });
    }

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/[^\d/]/g, '');
        if (!value.includes('/') && value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        value = value.slice(0, 5);

        handleSetPaymentInfo({ ...paymentInfo, cardExpDate: value });
    }

    console.log(errors)
    return (
        <div className="payment-form">
            <PaymentMethodSelector
                selectedPaymentMethod={paymentInfo.paymentMethod}
                onPaymentMethodChange={handleChange}
                isCompany={billingInfo.companyName !== '' && billingInfo.companyVat !== ''}
            />
            {paymentInfo.paymentMethod === 'Creditcard' && (
                <>
                    <div>
                        <CardSelector
                            selectedCardType={paymentInfo.cardType || 'Visa/Dankort'}
                            onCardTypeChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Card Number</label>
                        <input
                            name="cardNo"
                            type="text"
                            value={paymentInfo.cardNo || ''}
                            onChange={handleCardNumberChange}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                        />
                    </div>
                    <div>
                        <label>Expiration Date (MM/YY)</label>
                        <input
                            name="cardExpDate"
                            type="numeric"
                            value={paymentInfo.cardExpDate || ''}
                            onChange={handleDateChange}
                            placeholder="MM/YY"
                        />
                    </div>
                    <div>
                        <label>CVV</label>
                        <input
                            name="cvv"
                            type="text"
                            value={paymentInfo.cvv || ''}
                            onChange={handleChange}
                            placeholder="CVV"
                            maxLength={3}
                        />
                    </div>
                </>
            )}

            {paymentInfo.paymentMethod === 'MobilePay' && (
                <div>
                    <label>MobilePay Number</label>
                    <input
                        name="mobilePayNumber"
                        type="text"
                        value={paymentInfo.mobilePayNumber || ''}
                        onChange={handleChange}
                        placeholder="MobilePay Number"
                    />
                </div>
            )}

            {paymentInfo.paymentMethod === 'Invoice' && (
                <p>You'll receive the invoice with your order. Please pay within 30 days</p>
            )}

            <div>
                <label>Gift Card Number</label>
                <input
                    name="giftCardNumber"
                    type="text"
                    value={paymentInfo.giftCardNumber || ''}
                    onChange={handleChange}
                    placeholder="Gift Card Number"
                />
            </div>
            <button onClick={handleContinue} disabled={Object.keys(errors).length > 0}>Continue</button>
        </div>
    );
};

export default PaymentForm;