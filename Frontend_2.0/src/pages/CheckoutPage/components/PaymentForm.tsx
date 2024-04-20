import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import "./PaymentForm.css"

const PaymentForm: React.FC = () => {
  const { paymentInfo, handleSetPaymentInfo } = useCheckout();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    giftCardNumberError: "",
    giftCardAmountError: "",
    mobilePhoneNumberError: "",
  });
  


  const handleContinue = () => {
    if (paymentInfo.paymentMethod === "gift-card") {
      if (!paymentInfo.giftCardNumber || errors.giftCardNumberError) {
        alert("Please enter a valid gift card number.");
        return;
      }
      if (!paymentInfo.giftCardAmount || errors.giftCardAmountError) {
        alert("Please enter a valid gift card amount.");
        return;
      }
    }
    navigate("/checkout/confirmation");
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "mobilePhoneNumber"){
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev, 
          mobilePhoneNumberError: "Mobile phone number must contain only numbers.", 
        }));
       } else if (value.length !== 8) {
        setErrors((prev) => ({
      ...prev, 
      mobilePhoneNumberError: "Mobile phone number must be exactly 8 digits.", 
     }));

    }else if(!/^\d{8}$/.test(value)){
      setErrors((prev) => ({
        ...prev,
        mobilePhoneNumberError: "Mobile phone number must contain only digits."
      }));
    }else{
      setErrors((prev) => ({...prev, mobilePhoneNumberError: " "}))
    }

  }
  handleSetPaymentInfo({ ...paymentInfo, [name]: value });
  };


  const handleGiftCardChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleSetPaymentInfo({ ...paymentInfo, [name]: value });
    if (name === "giftCardNumber") {
      if (!/^\d+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          giftCardNumberError: "Gift card number must be numeric.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, giftCardNumberError: "" }));
      }
    }
    if (name === "giftCardAmount") {
      const amount = parseFloat(value);
      if (isNaN(amount) || amount <= 0) {
        setErrors((prev) => ({
          ...prev,
          giftCardAmountError: "Gift card amount must be a positive number.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, giftCardAmountError: "" }));
      }
    }

    handleSetPaymentInfo({ ...paymentInfo, [name]: value });
  };
  return (
    <div className="form-container">
    <form  onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
      <div className="form-group">
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={paymentInfo.paymentMethod}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => handleChange(event)}
          className="input"
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="gift-card">Gift Card</option>
          <option value="invoice">Invoice</option>
          <option value="mobilpay">MobilPay</option>
        </select>
      </div>
      {/* Empty space */}
      <div className="spacer"></div>
      
      {paymentInfo.paymentMethod === "mobilpay" && (
        <div className="form-group">
          <label>Enter your Phone Number</label>
          <input
            type="tel"
            name="mobilePhoneNumber"
            value={paymentInfo.mobilePhoneNumber || ''}
            onChange={(e) => handleChange(e)}
            placeholder="Mobile Phone Number"
            className="input"
          />
          {errors.mobilePhoneNumberError && (
            <div className="form-message">{errors.mobilePhoneNumberError}</div>
          )}
        </div>
      )}

      {paymentInfo.paymentMethod === "gift-card" && (
        <>
          <div className="form-group">
            <label>Gift Card Number</label>
            <input
              type="text"
              name="giftCardNumber"
              value={paymentInfo.giftCardNumber || ""}
              onChange={handleGiftCardChange}
              required
              className="input"
            />
            {errors.giftCardNumberError && (
              <div className="form-message">{errors.giftCardNumberError}</div>
            )}
          </div>
          <div className="form-group">
            <label>Gift Card Amount</label>
            <input
              type="number"
              name="giftCardAmount"
              value={paymentInfo.giftCardAmount || ""}
              onChange={handleGiftCardChange}
              required
              className="input"
            />
            {errors.giftCardAmountError && (
              <div className="form-message">{errors.giftCardAmountError}</div>
            )}
          </div>

        </>
      )}

        <div className="form-group-button">
          <button onClick={handleContinue}>Continue to Payment</button>
        </div>
      </form>
      </div>
    
  );
};

export default PaymentForm;
