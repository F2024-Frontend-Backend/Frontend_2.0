import React, { SetStateAction, useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import { SpinningCircles } from "react-loading-icons";
import axiosInstance, { submitOrder } from "../../../api/axios";
import "../../BasketPage/BasketPage.css";
import "./Confirmation.css";
import { useOrderResponse } from "../../../hooks/useOrderResponse";

const Confirmation: React.FC = () => {
  const { billingInfo, paymentInfo } = useCheckout();
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
    <h1>Order Confirmation</h1>
      {isLoading && (
        <div className="loading spinner">
          <strong>
            Loading...
            <SpinningCircles />
          </strong>
        </div>
      )}
      <div>
        <h2>Billing Information</h2>
        <p>
          {billingInfo.firstName} {billingInfo.lastName}
        </p>
        <p>{billingInfo.email}</p>
        <p>{billingInfo.address1}</p>
      </div>
      <div>
        <h2>Payment Information</h2>
        <p>Payment Method: {paymentInfo.paymentMethod}</p>
        <p>Card No:{paymentInfo.cardNo?.substring(0,4)+"-"+paymentInfo.cardNo?.substring(5,paymentInfo.cardNo.length-10)+"-XXXX-XXXX"}</p>
      </div>
      <button className="ConfClick" onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
    </>
  );
};

export default Confirmation;
