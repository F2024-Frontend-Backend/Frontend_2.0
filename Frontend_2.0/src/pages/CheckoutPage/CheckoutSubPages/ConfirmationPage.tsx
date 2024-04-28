import React, { SetStateAction, useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import { SpinningCircles } from "react-loading-icons";
import axiosInstance, { submitOrder } from "../../../api/axios";
import "../../BasketPage/BasketPage.css";
import "./ConfirmationPage.css";
import { useOrderResponse } from "../../../hooks/useOrderResponse";
import OrderSummary from "./OrderSummary";
import PurchaseTotal from "../../TotalPurchase/PurchaseTotal";
import { Alert, Dialog, Modal } from "@mui/material";

const Confirmation: React.FC = () => {
  const { purchaseTotal, billingInfo, paymentInfo } = useCheckout();
  const navigate = useNavigate();
  const [isLoading, setloading] = useState(false);
  const [isErrVisible, setErrVisible] = useState<boolean>(false);
  const handleVisibility = () => {
    setErrVisible(false)
  }

  const handleConfirmOrder = async () => {
    setloading(true);
      try{
        const response = await submitOrder();
        console.log("Response data on submit:", response);
        navigate('/receipt');
      } catch (error) {
        console.log(error)
        setErrVisible(true);
        setloading(false);
      }
  };
  return (
    <>
   <div className="btn-Wrapper">
    <div className="ConfComp">
      {isLoading && (
        <div className="loading spinner">
          <strong>
            Loading...
            <SpinningCircles />
          </strong>
        </div>
      )}
      <div className="Wrapper-rapper">
        <div className="allInfo">
          <div className="BillAddr">
            <h2>Billing Address</h2>
            <hr style={{ margin: "10px 0" }} />
            <p>
              <strong>Name: </strong> {billingInfo.firstName} {billingInfo.lastName}
            </p>
            <p>
            <strong>Email</strong>: {billingInfo.email}
            </p>
            <p>
            <strong>Address</strong>: {billingInfo.address1}
            </p>
            <p>
            <strong>Post code</strong>: {billingInfo.postalCode}
            </p>
            <div>
            {billingInfo.deliveryAddress && (
              <div>
                <p><strong>Delivery Address:</strong>:{billingInfo.deliveryAddress}</p>
            </div>
            )}
            </div>
          </div>
          <div className="PaymentDetails">
            <h2>Payment Details</h2>
            <hr style={{ margin: "" }} />
            <p><strong>Payment Method</strong>: {paymentInfo.paymentMethod}</p>
            {paymentInfo.paymentMethod === "MobilePay" && (
              <div>
                  <p><strong>mobile pay number</strong>: {paymentInfo.mobilePayNumber}</p>
              </div>
            )}
            {paymentInfo.paymentMethod === "Creditcard" && ( 
            <div>
              <p><strong>Card type</strong>: {paymentInfo.cardType}</p>
              <p><strong>Card No</strong>:{paymentInfo.cardNo?.substring(0,4)+"-"+paymentInfo.cardNo?.substring(5,paymentInfo.cardNo.length-10)+"-XXXX-XXXX"}</p>
              <p><strong>Expiry date</strong>: {paymentInfo.cardExpDate}</p>
            </div>
          )}{paymentInfo.paymentMethod === "Invoice" && ( 
            <div>
              <p><strong>Company Name</strong>: {billingInfo.companyName}</p>
              <p><strong>Company VAT</strong>: {billingInfo.companyVat}</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
    <button className="ConfClick" onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
    <div className="err">
        {isErrVisible && (
          <Alert
            severity="error"
            className="err-alert"
            onClose={() => setErrVisible(false)}
          >
            <p>Something went wrong! {<hr></hr>}Please, try again, or contact customer support.</p>
          </Alert>
        )}
    </div>
    </>
  );
};

export default Confirmation;
