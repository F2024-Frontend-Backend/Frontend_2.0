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

  const [isDeliveryDifferent, setIsDeliveryDifferent] = useState(false);

  const handleContinue = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setloading(true);
    setTimeout(() => {
      navigate("/checkout/payment");
    }, 1000);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Input name:", name);
    console.log("Input value before setting billingInfo:", value);

    handleSetBillingInfo({ 
      ...billingInfo, 
      [name]: value 
    });

    console.log("Input value after setting billingInfo:", billingInfo[name]);
    console.log("billingInfo state:", billingInfo);

    if (name === 'postalCode' && value.length === 4) {
      try {
        const city = await validatePostalCode(value, false);
        handleSetBillingInfo({
           ...billingInfo, 
           [name]: value,
           city: city
          });
      } catch(error) {
        console.log("Error validating postal code:", error);
      }
    }
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

  const handleToggleDelivery = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDeliveryDifferent(e.target.checked);
    if (!e.target.checked) {
      // Reset delivery information if unchecked
      handleSetBillingInfo({
        ...billingInfo,
        deliveryFirstName: null,
        deliveryLastName: null,
        deliveryAddress: null,
        deliveryPostalCode: null,
        deliveryCity: null,
      });
    }
  };

  return (
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
        <label>Address Line1</label>
        <input
          type="text"
          name="address1"
          value={billingInfo.address1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address Line2(Optional)</label>
        <input
          type="text"
          name="address2"
          value={billingInfo.address2 || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={billingInfo.postalCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={billingInfo.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={billingInfo.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isDeliveryDifferent}
            onChange={handleToggleDelivery}
          />
          Deliver to a different address?
        </label>
      </div>
      {isDeliveryDifferent && (
        <>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="deliveryFirstName"
              value={billingInfo.deliveryFirstName || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="deliveryLastName"
              value={billingInfo.deliveryLastName || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Delivery Address</label>
            <input
              type="text"
              name="deliveryAddress"
              value={billingInfo.deliveryAddress || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              name="deliveryPostalCode"
              value={billingInfo.deliveryPostalCode || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="deliveryCity"
              value={billingInfo.deliveryCity || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Company Name (Optional)</label>
            <input
              type="text"
              name="companyName"
              value={billingInfo.companyName || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Company VAT (Optional)</label>
            <input
              type="text"
              name="companyVat"
              value={billingInfo.companyVat || ""}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <button onClick={handleContinue}>Continue to Payment</button>
      {isLoading && (
          <div className="loading spinner">
            <strong>
              Loading...
              <SpinningCircles />
            </strong>
          </div>
        )}
    </form>
  );
};

export default BillingForm;
