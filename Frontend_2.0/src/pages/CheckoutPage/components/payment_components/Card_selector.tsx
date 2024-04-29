import "./Selector.css";

interface CardSelectorProps {
  selectedCardType: string;
  onCardTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CardSelector = ({
  selectedCardType,
  onCardTypeChange,
}: CardSelectorProps) => {
  const cardTypes = ["Visa/Dankort", "Visa", "MasterCard"];

  return (
    <div className="credit-card-selector">
      {cardTypes.map((cardType) => (
        <label
          key={cardType}
          className={`button ${
            selectedCardType === cardType ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="cardType"
            value={cardType}
            checked={selectedCardType === cardType}
            onChange={onCardTypeChange}
          />{" "}
          {cardType}
        </label>
      ))}
    </div>
  );
};

interface PaymentMethodSelectorProps {
  selectedPaymentMethod: string;
  onPaymentMethodChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isCompany: boolean;
  disabledMethods?: string[];
}

export const PaymentMethodSelector = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
  isCompany,
  disabledMethods = [],
}: PaymentMethodSelectorProps) => {
  const paymentMethods = [
    { name: "Creditcard", label: "Credit Card" },
    { name: "MobilePay", label: "MobilePay" },
    { name: "Invoice", label: "Invoice", isCompany: true }, // Considered only for companies
  ];
  const isInvoiceDisabled = disabledMethods.includes("Invoice");
  const isMobilePayDisabled = disabledMethods.includes("MobilePay");
  return (
    <div className="selector">
      {paymentMethods.map(
        ({ name, label, isCompany: isCompanyOnly }) =>
          (!isCompanyOnly || isCompany) && (
            <label
              key={name}
              className={`button ${
                selectedPaymentMethod === name ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={name}
                checked={selectedPaymentMethod === name}
                onChange={onPaymentMethodChange}
                disabled={disabledMethods.includes(name)}
              />{" "}
              {label}
            </label>
          )
      )}
    </div>
  );
};
