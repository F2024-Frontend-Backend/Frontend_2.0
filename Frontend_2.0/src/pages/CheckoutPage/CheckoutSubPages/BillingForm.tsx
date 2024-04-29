import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import "../../BasketPage/BasketPage.css";
import { SpinningCircles } from "react-loading-icons";
import {validateVAT} from "../components/BillingFormComponents/vatUtils"
import "./BillingForm.css"

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
  termsAcceptedError?: string;
}

const BillingForm: React.FC = () => {
  const { billingInfo, handleSetBillingInfo } = useCheckout();
  const navigate = useNavigate();

  const [isLoading, setloading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isDeliveryDifferent, setIsDeliveryDifferent] = useState(false);
  const [isTerms,setTerms] = useState(false);
  const [isMarketEmails, setMarketEmails] = useState(false);

  const [visitedFields, setVisitedFields] = useState({
    firstName: false,
    lastName: false,
    address1: false,
    address2: false,
    postalCode: false,
    city: false,
    phone: false,
    email: false,
    country: false,
    deliveryFirstName: false,
    deliveryLastName: false,
    deliveryAddress: false,
    deliveryPostalCode: false,
    deliveryCity: false,
    companyName: false,
    companyVat: false,
  });

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
    if(!isTerms){
      newErrors.termsAcceptedError = "To proceed, you must accept market terms and conditions."
    }else{
      delete newErrors.termsAcceptedError;
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
    };
    setErrors(newErrors);
    console.log(errors)
  }
  

  
  useEffect(() => {
    validateForm();
  }, [billingInfo, isDeliveryDifferent,isTerms]);

  const disableContinue = false; /*{Object.keys(errors).length > 0}*/
  const handleContinue = (event: { preventDefault: () => void }) => {
    if(Object.keys(errors).length > 0){
   
    }else{
    event.preventDefault();
    setloading(true);
    setTimeout(() => {
      navigate("/checkout/payment");
    }, 1000);
  }
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
        setErrors((prevErrors) => ({
          ...prevErrors,
          postalCodeError: "Invalid postal code entered",
        }));
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
  const handleToggleTerms = (e: ChangeEvent<HTMLInputElement>) => {
    setTerms(e.target.checked);
    if (!e.target.checked) {
      handleSetBillingInfo({
        ...billingInfo
      })
      e.target.checked
    }
  };
  const handleToggleMarketEmails = (e: ChangeEvent<HTMLInputElement>) => {
    setMarketEmails(e.target.checked);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setVisitedFields({
      ...visitedFields,
      [event.target.name]: true,
    });
  };

  const handleVATChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = event.target;
    handleSetBillingInfo({...billingInfo, [name]: value })
    if(typeof billingInfo.companyVat != null){
      const valVat = validateVAT(value);
      if (!valVat.isValid) {
        setErrors
        setErrors((prev) => ({
          ...prev,
          "VAT-valdiation error": valVat.message
        }))
        return valVat.message
      };
      }
      return handleSetBillingInfo({ ...billingInfo, [name]: value})
    }

  return (
    <div className="outer-wrapper">
      <div className="BI-wrapper-rapper">
      <h1>Billing Info</h1>
        <div className="BI-wrapper">
          <div className="BI-info">
            <div className="info-container">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                required
                value={billingInfo.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="info-container">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                value={billingInfo.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="info-container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                value={billingInfo.email}
                onChange={handleChange}
              />
            </div>
            <div className="info-container">
              <label>Address Line1</label>
              <input
                type="text"
                name="address1"
                required
                value={billingInfo.address1}
                onChange={handleChange}
              />
            </div>
            <div className="info-container">
              <label>Address Line2(Optional)</label>
              <input
                type="text"
                name="address2"
                value={billingInfo.address2 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="info-container">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                required
                maxLength={4}
                value={billingInfo.postalCode}
                onChange={handleChange}
              />
            </div>
            <div className="info-container">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={billingInfo.city}
                onChange={handleChange}
              />
            </div>
            <div className="info-container">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                required
                value={billingInfo.phone}
                onChange={handleChange}
              />
            </div>
            <div className="info-container">
              <label>Country</label>
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
          <div className="BI-extra">
            <></>
          {isDeliveryDifferent && (
              <>
                <div className="info-container">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="deliveryFirstName"
                    required
                    value={billingInfo.deliveryFirstName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="deliveryLastName"
                    required
                    value={billingInfo.deliveryLastName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <label>Delivery Address</label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    required
                    value={billingInfo.deliveryAddress || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="deliveryPostalCode"
                    required
                    maxLength={4}
                    value={billingInfo.deliveryPostalCode || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <label>City</label>
                  <input
                    type="text"
                    name="deliveryCity"
                    value={billingInfo.deliveryCity || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <label>Company Name (Optional)</label>
                  <input
                    type="text"
                    name="companyName"
                    value={billingInfo.companyName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <label>Company VAT (Optional)</label>
                  <input
                    type="text"
                    name="companyVat"
                    value={billingInfo.companyVat || ""}
                    onChange={handleVATChange}
                    className={`${
                      visitedFields.companyVat && errors.companyVatError ? "" : ""
                    }`}
                  />
                  {errors.companyVatError && <div className="input-error">{errors.companyVatError}</div>}
                </div>
              </>
            )}
          <div className="info-container">
            <label>Order Comment:</label>
            <input 
              type="text"
              name="comment"
              value={billingInfo.orderComment || ""}
              onChange={handleChange}
              maxLength={100}
            />
          </div>
        </div>
      </div>
      </div>
       <div className="checkbox-wrapper">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={isTerms}
                  onChange={handleToggleTerms}
                  required
                />
                I agree to the <a href="terms-and-conditions" id="tnc">terms and conditions</a>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={isDeliveryDifferent}
                  onChange={handleToggleDelivery}
                />
                Deliver to a different address?
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={isMarketEmails}
                  onChange={handleToggleMarketEmails}
                  required
                />
                I want to recieve marketing emails.
              </label>
            </div>
            </div>
            <button className="btn" onClick={handleContinue} disabled={disableContinue}>
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
