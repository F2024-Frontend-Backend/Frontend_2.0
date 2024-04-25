import React from "react";
import { useCheckout } from "../../../hooks/useCheckout";
import { useBasket } from "../../../hooks/useBasket";
import "./OrderSummary.css"
const OrderSummary: React.FC = () => {
    const { basket } = useBasket();
    const { purchaseTotal } = useCheckout();

    return (
        <div className="prodsum">
            <h1>Order Summary</h1>
            <div className="listdiv">
            <ul className="ulist"style={{ listStyleType: "none" }}>
                {basket.map((item) => (
                    <>
                    <li className="prodlist" key={item.product.string_id}>
                        <img className="prodimg" src={item.product.image} alt={item.product.name}/>
                        <div className="prodinfo">
                        <span><p>{item.product.name}</p></span>{" "}
                        <span><p>{item.product.price}kr.-</p></span>
                        </div>
                    </li>
                    <hr style={{ margin: "10px 0" }} />
                    </>
                ))}
            </ul>
            </div>
            <div className="totdiv">
            <p>Total: {purchaseTotal.total}kr.-</p>
            </div>
        </div>
    );
};

export default OrderSummary;