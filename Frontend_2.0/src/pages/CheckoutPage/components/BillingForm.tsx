import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import "../../BasketPage/BasketPage.css";
import { SpinningCircles } from "react-loading-icons";

interface Errors {
  firstNameError?: string;
  lastNameError?: string;
  address1Error?: string;
  address2Error?: string;
  postalCodeError?: string;
  cityError?: string;
  phoneError?: string;
  emailError?: string;
  countryError?: string;
  deliveryFirstNameError?: string;
  deliveryLastNameError?: string;
  deliveryAddressError?: string;
  deliveryPostalCodeError?: string;
  deliveryCityError?: string;
  companyNameError?: string;
  companyVatError?: string;
}

const BillingForm: React.FC = () => {
  const { billingInfo, handleSetBillingInfo } = useCheckout();
  const navigate = useNavigate();

  const [isLoading, setloading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isDeliveryDifferent, setIsDeliveryDifferent] = useState(false);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!billingInfo.firstName) {
      newErrors.firstNameError = "First name is required";
    } else {
      delete newErrors.firstNameError;
    }

    if (!billingInfo.lastName) {
      newErrors.lastNameError = "Last name is required";
    } else {
      delete newErrors.lastNameError;
    }

    if (!billingInfo.address1) {
      newErrors.address1Error = "Address is required";
    } else {
      delete newErrors.address1Error;
    }

    if (!billingInfo.postalCode) {
      newErrors.postalCodeError = "Postal code is required";
    } else {
      delete newErrors.postalCodeError;
    }

    if (!billingInfo.city) {
      newErrors.cityError = "City is required";
    } else {
      delete newErrors.cityError;
    }

    if (!billingInfo.phone) {
      newErrors.phoneError = "Phone number is required";
    } else {
      delete newErrors.phoneError;
    }

    if (!billingInfo.email) {
      newErrors.emailError = "Email is required";
    } else {
      delete newErrors.emailError;
    }

    if (!billingInfo.country) {
      newErrors.countryError = "Country is required";
    } else {
      delete newErrors.countryError;
    }

    if (isDeliveryDifferent) {
      if (!billingInfo.deliveryFirstName) {
        newErrors.deliveryFirstNameError = "First name is required";
      } else {
        delete newErrors.deliveryFirstNameError;
      }

      if (!billingInfo.deliveryLastName) {
        newErrors.deliveryLastNameError = "Last name is required";
      } else {
        delete newErrors.deliveryLastNameError;
      }

      if (!billingInfo.deliveryAddress) {
        newErrors.deliveryAddressError = "Address is required";
      } else {
        delete newErrors.deliveryAddressError;
      }

      if (!billingInfo.deliveryPostalCode) {
        newErrors.deliveryPostalCodeError = "Postal code is required";
      } else {
        delete newErrors.deliveryPostalCodeError;
      }

      if (!billingInfo.deliveryCity) {
        newErrors.deliveryCityError = "City is required";
      } else {
        delete newErrors.deliveryCityError;
      }
    }
    setErrors(newErrors);
  };

  useEffect(() => {
    validateForm();
  }, [billingInfo, isDeliveryDifferent]);

  const disableContinue = false; /*{Object.keys(errors).length > 0}*/
  const handleContinue = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setloading(true);
    setTimeout(() => {
      navigate("/checkout/payment");
    }, 1000);
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("Input name:", name);
    console.log("Input value before setting billingInfo:", value);

    if (name === "postalCode" && value.length === 4) {
      try {
        const city = await validatePostalCode(value);
        handleSetBillingInfo({
          ...billingInfo,
          [name]: value,
          city: city,
        });
      } catch (error) {
        console.log("Error validating postal code:", error);
      }
    } else {
      handleSetBillingInfo({
        ...billingInfo,
        [name]: value,
      });
    }
  };

  const validatePostalCode = async (postalCode: string) => {
    const response = await fetch(
      `https://api.dataforsyningen.dk/postnumre/${postalCode}`
    );
    if (!response.ok) throw new Error("Response not ok");
    const data = await response.json();
    if (data && data.navn) {
      return data.navn;
    } else {
      throw new Error("Invalid postal code entered");
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

  console.log("Errors", errors);

  return (
    <div className="form">
      <div>
        <label>First Name</label>
        <div className="fields">
          <input
            className="input_field"
            type="text"
            name="firstName"
            required
            value={billingInfo.firstName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div className="fields">
          <input
            type="text"
            name="lastName"
            required
            value={billingInfo.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div className="fields">
          <input
            type="email"
            name="email"
            required
            value={billingInfo.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Address Line1</label>
        <div className="fields">
          <input
            type="text"
            name="address1"
            required
            value={billingInfo.address1}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Address Line2(Optional)</label>
        <div className="fields">
          <input
            type="text"
            name="address2"
            value={billingInfo.address2 || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Postal Code</label>
        <div className="fields">
          <input
            type="text"
            name="postalCode"
            required
            maxLength={4}
            value={billingInfo.postalCode}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>City</label>
        <div className="fields">
          <input
            type="text"
            name="city"
            value={billingInfo.city}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Phone</label>
        <div className="fields">
          <input
            type="text"
            name="phone"
            required
            value={billingInfo.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Country</label>
        <div className="fields">
          <select
            name="country"
            required
            value={billingInfo.country}
            onChange={handleChange}
          >
            <option value="Denmark">Denmark</option>
          </select>
        </div>
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
        {isDeliveryDifferent && (
          <>
            <div>
              <label>First Name</label>
              <div className="fields">
                <input
                  type="text"
                  name="deliveryFirstName"
                  required
                  value={billingInfo.deliveryFirstName || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <div className="fields">
                <input
                  type="text"
                  name="deliveryLastName"
                  required
                  value={billingInfo.deliveryLastName || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>Delivery Address</label>
              <div className="fields">
                <input
                  type="text"
                  name="deliveryAddress"
                  required
                  value={billingInfo.deliveryAddress || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>Postal Code</label>
              <div className="fields">
                <input
                  type="text"
                  name="deliveryPostalCode"
                  required
                  maxLength={4}
                  value={billingInfo.deliveryPostalCode || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>City</label>
              <div className="fields">
                <input
                  type="text"
                  name="deliveryCity"
                  value={billingInfo.deliveryCity || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>Company Name (Optional)</label>
              <div className="fields">
                <input
                  type="text"
                  name="companyName"
                  value={billingInfo.companyName || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>Company VAT (Optional)</label>
              <div className="fields">
                <input
                  type="text"
                  name="companyVat"
                  value={billingInfo.companyVat || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <button onClick={handleContinue} disabled={disableContinue}>
        Continue to Payment
      </button>
      {isLoading && (
        <div className="loading spinner">
          <strong>
            Loading...
            <SpinningCircles />
          </strong>
        </div>
      )}
    </div>
  );
};

export default BillingForm;
