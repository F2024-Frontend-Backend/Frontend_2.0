import React, { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import {
  CardSelector,
  PaymentMethodSelector,
} from "../components/payment_components/Card_selector";
import {
  isValidCardNumber,
  isValidDate,
  isValidCvv,
} from "../components/payment_components/CardUtils";
import "./PaymentStyling.css";
import { SpinningCircles } from "react-loading-icons";
import "../../BasketPage/BasketPage.css";

interface Errors {
  cardNoError?: string;
  cardExpDateError?: string;
  cvvError?: string;
  mobilePayNumberError?: string;
  giftCardError?: string;
  giftCardAmountError?: string;
}
const PaymentForm: React.FC = () => {
  const { paymentInfo, handleSetPaymentInfo } = useCheckout();
  const { billingInfo } = useCheckout();
  const navigate = useNavigate();

  /*const [errors, setErrors] = useState({
        giftCardNumberError: "",
        giftCardAmountError: "",
        mobilePhoneNumberError: "",
    });*/

  const [isLoading, setloading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const [visitedFields, setVisitedFields] = useState({
    cardNo: false,
    cardExpDate: false,
    cvv: false,
    mobilePayNumber: false,
    giftCard: false,
    giftCardAmount: false,
  });

  const validateForm = () => {
    const newErrors: Errors = { ...errors };

    if (!paymentInfo.paymentMethod) {
      newErrors.cardNoError = "Please select a payment method";
      setErrors(newErrors);
    }

    if (paymentInfo.paymentMethod === "Creditcard") {
      const cardNumberValidationResult = isValidCardNumber(
        paymentInfo.cardNo || ""
      );
      if (cardNumberValidationResult !== true) {
        newErrors.cardNoError = cardNumberValidationResult.message;
      } else {
        delete newErrors.cardNoError;
      }

      if (!isValidDate(paymentInfo.cardExpDate || "")) {
        newErrors.cardExpDateError = "Invalid expiration date";
      } else {
        delete newErrors.cardExpDateError;
      }

      if (!isValidCvv(paymentInfo.cvv || "")) {
        newErrors.cvvError;
        delete newErrors.cvvError;
      }
      setErrors(newErrors);
    }

    if (paymentInfo.paymentMethod === "MobilePay") {
      if (!/^\d{8}$/.test(paymentInfo.mobilePayNumber || "")) {
        newErrors.mobilePayNumberError = "Invalid phone number";
      } else {
        delete newErrors.mobilePayNumberError;
      }
      setErrors(newErrors);
    }
  };

  useEffect(validateForm, [paymentInfo, visitedFields]);

  const disableContinue = false; /*Object.keys(errors).length > 0*/

  const handleContinue = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setloading(true);
    setTimeout(() => {
      navigate("/checkout/confirmation");
    }, 1000);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setVisitedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    handleSetPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.substring(i, i + 4));
    }
    value = parts.join(" ");
    handleSetPaymentInfo({ ...paymentInfo, cardNo: value });
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/[^\d/]/g, "");
    if (!value.includes("/") && value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    value = value.slice(0, 5);

    handleSetPaymentInfo({ ...paymentInfo, cardExpDate: value });
  };

  const handleGiftCardChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const sanitizedValue =
      name === "giftCardNumber" ? value.replace(/\D/g, "") : value;
    handleSetPaymentInfo({ ...paymentInfo, [name]: sanitizedValue });

    if (name === "giftCardNumber") {
      const isValid = /^\d+$/.test(sanitizedValue) && sanitizedValue.length > 0;
      setErrors((prev) => ({
        ...prev,
        giftCardError: isValid
          ? undefined
          : "Gift card number must be numeric.",
      }));
    } else if (name === "giftCardAmount") {
      const amount = parseFloat(sanitizedValue);
      const isValid = value === "" || (!isNaN(amount) && amount > 0);
      setErrors((prev) => ({
        ...prev,
        giftCardAmountError: isValid
          ? undefined
          : "Gift card amount must be a positive number.",
      }));
    }
  };

  console.log(errors);
  console.log(billingInfo.companyName && billingInfo.companyVat);

  return (
    <div className="payment-form">
      {isLoading && (
        <div className="loading spinner">
          <strong>
            Loading...
            <SpinningCircles />
          </strong>
        </div>
      )}
      <PaymentMethodSelector
        selectedPaymentMethod={paymentInfo.paymentMethod}
        onPaymentMethodChange={handleChange}
        isCompany={
          (billingInfo.companyName || "") !== "" &&
          (billingInfo.companyVat || "") !== ""
        }
      />
      {paymentInfo.paymentMethod === "Creditcard" && (
        <>
          <div>
            <CardSelector
              selectedCardType={paymentInfo.cardType || "Visa/Dankort"}
              onCardTypeChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Card Number</label>
            <input
              name="cardNo"
              type="text"
              value={paymentInfo.cardNo || ""}
              onBlur={handleBlur}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className={`${
                visitedFields.cardNo && errors.cardNoError ? "input-error" : ""
              }`}
            />
          </div>
          <div className="input-row">
            <div className="input-field">
              <label>Expiration Date (MM/YY)</label>
              {visitedFields.cardExpDate && errors.cardExpDateError && (
                <span className="error">{errors.cardExpDateError}</span>
              )}
              <input
                name="cardExpDate"
                type="numeric"
                value={paymentInfo.cardExpDate || ""}
                onBlur={handleBlur}
                onChange={handleDateChange}
                placeholder="MM/YY"
                className={`${
                  visitedFields.cardExpDate && errors.cardExpDateError
                    ? "input-error"
                    : ""
                }`}
              />
            </div>
            <div className="input-field">
              <label>CVV</label>
              {visitedFields.cvv && errors.cvvError && (
                <span className="error">{errors.cvvError}</span>
              )}
              <input
                name="cvv"
                type="text"
                value={paymentInfo.cvv || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="CVV"
                maxLength={3}
                className={`${
                  visitedFields.cvv && errors.cvvError ? "input-error" : ""
                }`}
              />
            </div>
          </div>
        </>
      )}

      {paymentInfo.paymentMethod === "MobilePay" && (
        <div className="input-field">
          <label>MobilePay Number</label>
          {visitedFields.mobilePayNumber && errors.mobilePayNumberError && (
            <span className="error">{errors.mobilePayNumberError}</span>
          )}
          <input
            name="mobilePayNumber"
            type="text"
            value={paymentInfo.mobilePayNumber || ""}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="MobilePay Number"
            className={`${
              visitedFields.mobilePayNumber && errors.mobilePayNumberError
                ? "input-error"
                : ""
            }`}
          />
        </div>
      )}

      {paymentInfo.paymentMethod === "Invoice" && (
        <p>
          You'll receive the invoice with your order. Please pay within 30 days
        </p>
      )}

      <div className="gift-card">
        <label>Use Gift Card (Optional) </label>
        <input
          name="giftCardNumber"
          type="text"
          value={paymentInfo.giftCardNumber || ""}
          onBlur={handleBlur}
          onChange={handleGiftCardChange}
          placeholder="Gift Card Number"
          className={
            visitedFields.giftCard && errors.giftCardError ? "input-error" : ""
          }
        />
        {visitedFields.giftCard && errors.giftCardError && (
          <p className="error">{errors.giftCardError}</p>
        )}
        <div className="gift-card">
          <label>Gift Card Amount</label>
          <input
            type="number"
            name="giftCardAmount"
            value={paymentInfo.giftCardAmount || ""}
            onChange={handleGiftCardChange}
            placeholder="Insert Amount"
            onBlur={handleBlur}
            className={
              visitedFields.giftCard && errors.giftCardError
                ? "input-error"
                : ""
            }
          />
          {visitedFields.giftCardAmount && errors.giftCardAmountError && (
            <p className="error">{errors.giftCardAmountError}</p>
          )}
        </div>
      </div>
      <button onClick={handleContinue} disabled={disableContinue}>
        Continue
      </button>
    </div>
  );
};

export default PaymentForm;
