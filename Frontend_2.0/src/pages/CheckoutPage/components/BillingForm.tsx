import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import "../../BasketPage/BasketPage.css";
import { SpinningCircles } from "react-loading-icons";

const BillingForm: React.FC = () => {
  const { billingInfo, handleSetBillingInfo } = useCheckout();
  const navigate = useNavigate();
  const [isLoading, setloading] = useState(false);

  const [errors, setErrors] = useState({
    postalError: "",
    vatErrors: "",
    deliveryPostalError: "",
  });

  const handleContinue = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setloading(true);
    setTimeout(() => {
      navigate("/checkout/payment");
    }, 1000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleSetBillingInfo({ ...billingInfo, [name]: value });
  };

  const validatePostalCode = async (postalCode: string, isDelivery = false) => {
    try {
      const response = await fetch(
        `https://api.dataforsyningen.dk/postnumre/${postalCode}`
      );
      if (!response.ok) throw new Error("Response not ok");
      const data = await response.json();
      if (data && data.navn) {
        handleSetBillingInfo({ ...billingInfo, city: data.navn });
        setErrors({ ...errors, postalError: "" });
      } else {
        setErrors({ ...errors, postalError: "Invalid postal code entered" });
      }
    } catch (error) {
      console.error("Invalid postal code entered", error);
      setErrors({ ...errors, postalError: "Invalid postal code entered" });
    }
  };

  return (
    <>
      <form>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={billingInfo.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={billingInfo.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={billingInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={billingInfo.address1}
            onChange={handleChange}
          />
        </div>
        {isLoading && (
          <div className="loading spinner">
            <strong>
              Loading...
              <SpinningCircles />
            </strong>
          </div>
        )}
        <button onClick={handleContinue}>Continue to Payment</button>
      </form>
    </>
  );
};

export default BillingForm;
