import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";

const BillingForm: React.FC = () => {
  const { billingInfo, handleSetBillingInfo } = useCheckout();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    postalError: "",
    vatErrors: "",
    deliveryPostalError: "",
  });

  const [isDeliveryDifferent, setIsDeliveryDifferent] = useState(false);

  const handleContinue = () => {
    navigate("/checkout/payment");
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleSetBillingInfo({ ...billingInfo, [name]: value });
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleSetBillingInfo({ ...billingInfo, [name]: value });
  };

  const handlePostalCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleSetBillingInfo({ ...billingInfo, [name]: value });

    if (value.length !== 4) {
      setErrors((prev) => ({
        ...prev,
        [name === "deliveryPostalCode" ? "deliveryPostalError" : "postalError"]:
          "Postal code must be exactly 4 digits",
      }));
      return;
    }
    setErrors((prev) => ({
      ...prev,
      [name === "deliveryPostalCode" ? "deliveryPostalError" : "postalError"]:
        "",
    }));

    let isDelivery = name === "deliveryPostalCode";
    if (isDelivery && !isDeliveryDifferent) {
      return;
    }

    try {
      const city = await validatePostalCode(value);
      handleSetBillingInfo({
        ...billingInfo,
        [name]: value,
        ...(isDelivery ? { deliveryCity: city } : { city: city }),
      });
      setErrors((prev) => ({
        ...prev,
        ...(isDelivery ? { deliveryPostalError: "" } : { postalError: "" }),
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        ...(isDelivery
          ? { deliveryPostalError: (error as Error).message }
          : { postalError: (error as Error).message }),
      }));
      console.log(`Error validating ${name}:`, (error as Error).message);
    }
  };

  const validatePostalCode = async (postalCode: string) => {
    const apiUrl = `https://api.dataforsyningen.dk/postnumre/${postalCode}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!response.ok || !data || !data.navn) {
        throw new Error("Postal code invalid");
      }
      return data.navn;
    } catch (error) {
      throw error;
    }
  };

  const handleToggleDelivery = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDeliveryDifferent(e.target.checked);
    if (!e.target.checked) {
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
          required
          value={billingInfo.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          required
          value={billingInfo.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={billingInfo.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address Line1</label>
        <input
          type="text"
          name="address1"
          required
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
          required
          maxLength={4}
          value={billingInfo.postalCode}
          onChange={handlePostalCodeChange}
        />
        {errors.postalError && (
          <div style={{ color: "red" }}>{errors.postalError}</div>
        )}
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
          required
          value={billingInfo.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Country</label>
        <select
          name="country"
          required
          value={billingInfo.country}
          onChange={handleSelectChange}
        >
          <option value="Denmark">Denmark</option>
        </select>
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
              required
              value={billingInfo.deliveryFirstName || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="deliveryLastName"
              required
              value={billingInfo.deliveryLastName || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Delivery Address</label>
            <input
              type="text"
              name="deliveryAddress"
              required
              value={billingInfo.deliveryAddress || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              name="deliveryPostalCode"
              required
              maxLength={4}
              value={billingInfo.deliveryPostalCode || ""}
              onChange={handlePostalCodeChange}
            />
            {errors.deliveryPostalError && (
              <div style={{ color: "red" }}>{errors.deliveryPostalError}</div>
            )}
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
    </form>
  );
};

export default BillingForm;
