import "./Selector.css";

interface CardSelectorProps {
    selectedCardType: string;
    onCardTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CardSelector = ({ selectedCardType, onCardTypeChange }: CardSelectorProps) => {
    const cardTypes = ['Visa/Dankort', 'Visa', 'MasterCard',];

    return (
        <div className="credit-card-selector">
            {cardTypes.map(cardType => (
                <label key={cardType} className={`button ${selectedCardType === cardType ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="cardType"
                        value={cardType}
                        checked={selectedCardType === cardType}
                        onChange={onCardTypeChange}
                    /> {cardType}
                </label>
            ))}
        </div>
    );
};

interface PaymentMethodSelectorProps {
    selectedPaymentMethod: string;
    onPaymentMethodChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isCompany: boolean;
}

export const PaymentMethodSelector = ({ selectedPaymentMethod, onPaymentMethodChange, isCompany }: PaymentMethodSelectorProps) => {
    const paymentMethods = ['Creditcard', 'MobilePay'];

    return (
        <div className="selector">
        {paymentMethods.map(paymentMethod => (
            <label key={paymentMethod} className={`button ${selectedPaymentMethod === paymentMethod ? 'selected' : ''}`}>
                <input
                    type="radio"
                    name="paymentMethod"
                    value={paymentMethod}
                    checked={selectedPaymentMethod === paymentMethod}
                    onChange={onPaymentMethodChange}
                /> {paymentMethod}
            </label>
        ))}
        {isCompany && (
            <label>
                <input
                    type="radio"
                    name="paymentMethod"
                    value="Invoice"
                    checked={selectedPaymentMethod === 'Invoice'}
                    onChange={onPaymentMethodChange}
                /> Invoice
            </label>
        )}
        </div>
    );
}