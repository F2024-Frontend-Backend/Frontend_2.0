import React, { SetStateAction, useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import { SpinningCircles } from "react-loading-icons";
import axiosInstance, { submitOrder } from "../../../api/axios";
import "../../BasketPage/BasketPage.css";
import "./Confirmation.css";
import { useOrderResponse } from "../../../hooks/useOrderResponse";
import OrderSummary from "./OrderSummary";
import PurchaseTotal from "../../TotalPurchase/PurchaseTotal";

const Confirmation: React.FC = () => {
  const { purchaseTotal, billingInfo, paymentInfo } = useCheckout();
  const navigate = useNavigate();
  const [isLoading, setloading] = useState(false);
  const [errVisible, setVisible] = useState<boolean>(false);
  const handleVisibility = () => {
    setVisible(false)
  }

  const handleConfirmOrder = async () => {
    setloading(true);
      try{
        const response = await submitOrder();
        console.log("Response data on submit:", response);
        navigate('/receipt');
      } catch (error) {
        console.log(error)
        setVisible(true);
        setloading(false);
      }
  };
  return (
    <>
    <div className="ConfComp">
    <dialog className="errocDialog" open={errVisible}>
          <p>An unexpected error occured!</p>
          {setTimeout(handleVisibility,5000) && <></>}
    </dialog>
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
            {billingInfo.companyVat &&(
              <div>
                <p><strong>Company name</strong>:{billingInfo.companyName}</p>
                <p><strong>Company VAT</strong>:{billingInfo.companyVat}</p>
              </div>
            )}
            </div>
          </div>
          <div className="PaymentDetails">
            <h2>Payment Details</h2>
            <hr style={{ margin: "10px 0" }} />
            <p>Payment Method: {paymentInfo.paymentMethod}</p>
            {paymentInfo.paymentMethod === "MobilePay" && (
              <div>
                  <p>mobile pay number: {paymentInfo.mobilePayNumber}</p>
              </div>
            )}
            {paymentInfo.paymentMethod === "Creditcard" && ( 
            <div>
              <p>Card type: {paymentInfo.cardType}</p>
              <p>Card No:{paymentInfo.cardNo?.substring(0,4)+"-"+paymentInfo.cardNo?.substring(5,paymentInfo.cardNo.length-10)+"-XXXX-XXXX"}</p>
              <p>Expiry date: {paymentInfo.cardExpDate}</p>
            </div>
          )}
          </div>
        </div>
        <button className="ConfClick" onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
    </div>
    </>
  );
};

export default Confirmation;
