import { useCheckout } from "../../hooks/useCheckout";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";

const PurchaseTotal = () => {
  const { purchaseTotal } = useCheckout();
  const [showAlert, setShowAlert] = useState(true);
  
  useEffect(() => {
    if (purchaseTotal.shipping == 0) setShowAlert(true);
    else {
      setShowAlert(false);
    }
  }, [purchaseTotal.shipping]);

  return (
    <>
      <div className="purchase-total">
        <h4>Total Before Shipping:</h4>
        <p>{purchaseTotal.total.toFixed(2)} DKK</p>
        {purchaseTotal.rebate && (
          <p>Rebate: -{purchaseTotal.rebate.toFixed(2)} DKK</p>
        )}
        <p>Shipping: {purchaseTotal.shipping.toFixed(2)} DKK</p>
        <h4>Total:</h4>
        <p>
          {(
            purchaseTotal.total +
            purchaseTotal.shipping -
            (purchaseTotal.rebate || 0)
          ).toFixed(2)}{" "}
          DKK
        </p>
      </div>
      <div>
        {showAlert && (
          <Alert severity="info" onClose={() => setShowAlert(false)}>
            Congratulations! Your order has earned free shipping.
          </Alert>
        )}
      </div>
    </>
  );
};

export default PurchaseTotal;
