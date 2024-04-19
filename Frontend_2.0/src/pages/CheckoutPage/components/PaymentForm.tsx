import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";

const PaymentForm: React.FC = () => {
  const { paymentInfo, handleSetPaymentInfo } = useCheckout();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    giftCardNumberError: "",
    giftCardAmountError: "",
    mobilePhoneNumberError: "",
  });

  const handleContinue = () => {
    if (errors.giftCardNumberError) {
      alert("Please correct the errors before continuing.");
      return;
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
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleContinue();
      }}
    >
      <div>
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={paymentInfo.paymentMethod}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            handleChange(event)
          }
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="gift-card">Gift Card</option>
          <option value="invoice">Invoice</option>
          <option value ="mobilpay">MobilPay</option>
        </select>
        
      </div>
      {paymentInfo.paymentMethod === "mobilpay" && (
         <div>
          <label>Mobile Phone Number</label>
          <input
            type="tel"
            name="mobilePhoneNumber"
            value={paymentInfo.mobilePhoneNumber || ''}
            onChange={(e) => handleChange(e)}
            placeholder="Mobile Phone Number"
           />
           {errors.mobilePhoneNumberError && (
             <div style={{ color: "red" }}>{errors.mobilePhoneNumberError}</div>
    )}
       </div>
      )}

      {paymentInfo.paymentMethod === "gift-card" && (
        <>
          <div>
            <label>Gift Card Number</label>
            <input
              type="text"
              name="giftCardNumber"
              value={paymentInfo.giftCardNumber || ""}
              onChange={handleGiftCardChange}
              required
            />
            {errors.giftCardNumberError && (
              <div style={{ color: "red" }}>{errors.giftCardNumberError}</div>
            )}
          </div>
          <div>
            <label>Gift Card Amount</label>
            <input
              type="number"
              name="giftCardAmount"
              value={paymentInfo.giftCardAmount || ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
              required
            />
          </div>

        </>
      )}
      <button onClick={handleContinue}>Continue</button>
    </form>
  );
};

export default PaymentForm;
