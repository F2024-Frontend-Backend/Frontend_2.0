import { useCheckout } from "../../hooks/useCheckout";
import "./PurchaseTotal.css";

const PurchaseTotal = () => {
  const { purchaseTotal } = useCheckout();

  return (
    <>
      <div className="purchase-total">
        <h4 className="total">Total Before Shipping:</h4>
        <p className="total-sum">{purchaseTotal.total.toFixed(2)} DKK</p>
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
    </>
  );
};

export default PurchaseTotal;
