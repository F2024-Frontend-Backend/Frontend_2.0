import React, { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import { CardSelector, PaymentMethodSelector } from "./payment_components/Card_selector";
import { isValidCardNumber, isValidDate, isValidCvv } from "./payment_components/CardUtils";
import  "./PaymentStyling.css";

interface Errors {
    cardNo?: string;
    cardExpDate?: string;
    cvv?: string;
    mobilePayNumber?: string;
}

const PaymentForm: React.FC = () => {
    const { paymentInfo, handleSetPaymentInfo } = useCheckout();
    const { billingInfo } = useCheckout();
    const navigate = useNavigate();

    const [errors, setErrors] = useState<Errors>({});
    const [visitedFields, setVisitedFields] = useState<Errors>({});

    const validateForm = () => {
        const newErrors: Errors = {};

        if (paymentInfo.paymentMethod === 'Creditcard') {
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
        }

        if(paymentInfo.paymentMethod === 'MobilePay') {
            if (!/^\d{8}$/.test(paymentInfo.mobilePayNumber || '')) {
                newErrors.mobilePayNumber = 'Invalid phone number';
            } else {
                delete newErrors.mobilePayNumber;
            }
            setErrors(newErrors);
        }
    };

    useEffect(() => {
        validateForm();
    }, [paymentInfo]);

    const handleContinue = () => {
        //This function should also validate the giftcard if it is present (API call to validate giftcard) probably done in checkoutProvider
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

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setVisitedFields({
            ...visitedFields,
            [event.target.name]: true
        });
    };

    console.log(errors)
    console.log(billingInfo.companyName && billingInfo.companyVat)
    return (
        <div className="payment-form">
            <PaymentMethodSelector
                selectedPaymentMethod={paymentInfo.paymentMethod}
                onPaymentMethodChange={handleChange}
                isCompany={(billingInfo.companyName || '') !== '' && (billingInfo.companyVat || '') !== ''}
            />
            {paymentInfo.paymentMethod === 'Creditcard' && (
                <>
                    <div>
                        <CardSelector
                            selectedCardType={paymentInfo.cardType || 'Visa/Dankort'}
                            onCardTypeChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label>Card Number</label>
                        <input
                            name="cardNo"
                            type="text"
                            value={paymentInfo.cardNo || ''}
                            onBlur={handleBlur}
                            onChange={handleCardNumberChange}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            className={`${visitedFields.cardNo && errors.cardNo ? 'input-error' : ''}`}
                        />
                    </div>
                    <div className="input-row">
                    <div className="input-field">
                        <label>Expiration Date (MM/YY)</label>
                        {visitedFields.cardExpDate && errors.cardExpDate && <span className="error">{errors.cardExpDate}</span>}
                        <input
                            name="cardExpDate"
                            type="numeric"
                            value={paymentInfo.cardExpDate || ''}
                            onBlur={handleBlur}
                            onChange={handleDateChange}
                            placeholder="MM/YY"
                            className={`${visitedFields.cardExpDate && errors.cardExpDate ? 'input-error' : ''}`}
                        />
                    </div>
                    <div className="input-field">
                        <label>CVV</label>
                        {visitedFields.cvv && errors.cvv && <span className="error">{errors.cvv}</span>}
                        <input
                            name="cvv"
                            type="text"
                            value={paymentInfo.cvv || ''}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="CVV"
                            maxLength={3}
                            className={`${visitedFields.cvv && errors.cvv ? 'input-error' : ''}`}
                        />
                    </div>
                    </div>
                </>
            )}

            {paymentInfo.paymentMethod === 'MobilePay' && (
                <div className="input-field">
                    <label>MobilePay Number</label>
                    {visitedFields.mobilePayNumber && errors.mobilePayNumber && <span className="error">{errors.mobilePayNumber}</span>}
                    <input
                        name="mobilePayNumber"
                        type="text"
                        value={paymentInfo.mobilePayNumber || ''}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="MobilePay Number"
                        className={`${visitedFields.mobilePayNumber && errors.mobilePayNumber ? 'input-error' : ''}`}
                    />
                </div>
            )}

            {paymentInfo.paymentMethod === 'Invoice' && (
                <p>You'll receive the invoice with your order. Please pay within 30 days</p>
            )}

            <div className="gift-card">
                <label>Use Gift Card (Optional) </label>
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