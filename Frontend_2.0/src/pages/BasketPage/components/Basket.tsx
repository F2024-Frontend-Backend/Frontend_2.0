import React from 'react';
import BasketItem from './BasketItem';
import { BasketItem as BasketItemType } from '../../../types/types';

interface BasketProps {
    items: BasketItemType[];
}

const Basket: React.FC<BasketProps> = ({ items }) => {
    return (
        <div className="basket">
            {items.map((item) => (
                <BasketItem key={item.product.id} item={item} />
            ))}
        </div>
    );
};

export default Basket;
