import { useCheckout } from '../../hooks/useCheckout';

const PurchaseTotal = () => {
  const { purchaseTotal } = useCheckout();

  return (
    <div className="purchase-total">
      <h4>Total:</h4>
      <p>{purchaseTotal.total.toFixed(2)} DKK</p>
    </div>
  );
};

export default PurchaseTotal;