import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";

const PaymentForm: React.FC = () => {
  const { paymentInfo, handleSetPaymentInfo } = useCheckout();
  const navigate = useNavigate();
  //const [giftCardError, setGiftCardError] = useState("");

  const [errors, setErrors] = useState({
    giftCardNumberError: "",
    giftCardAmountError: "",
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
        </select>
      </div>

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
