import { useState, useEffect } from 'react';
import { useCheckout } from '../../../hooks/useCheckout';
import { fetchUpsellProducts, fetchRandomProducts } from '../../../api/fetchProducts';
import { Product } from '../../../types/types';
import './carousel.css';

const Carousel = () => {
    const { basket, updateBasket } = useCheckout();
    const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fecthAndSetCarouselProducts = async () => {
            const upsellIds = [...new Set(basket.filter(item => item.product.upsellProductId).map(item => item.product.upsellProductId))];
            if (upsellIds.length > 0) {
                try {
                    const fetchedUpsellProducts = await fetchUpsellProducts(upsellIds);
                    console.log("Upsell products", fetchedUpsellProducts);

                    if (fetchedUpsellProducts.length < 5) {
                        console.log("Fetching additional products");
                        const additionalProducts = 5 - fetchedUpsellProducts.length;
                        const randomProducts = await fetchRandomProducts(additionalProducts);
                        fetchedUpsellProducts.push(...randomProducts);
                    }
                    setCarouselProducts(fetchedUpsellProducts);
                } catch (error) {
                    console.error("Failed to fetch upsell products", error);
                }
            }
        };
        fecthAndSetCarouselProducts();
    }, [basket]);

    const handleAddToBasket = (product: Product) => {
        const existingItem = basket.find(item => item.product.id === product.id);
        if (existingItem) {
            updateBasket({
                ...existingItem,
                quantity: existingItem.quantity + 1,
                subtotal: existingItem.subtotal + product.price
            });
        } else {
            updateBasket({
                product: product,
                quantity: 1,
                subtotal: product.price
            });
        }
        console.log("Basket content", basket)
    }

    return (
        <div className="carousel">
            {carouselProducts.map(product => (
                <div key={product.id} className="carousel-item">
                    <div className="product-image-wrapper">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <button
                            className="add-to-basket-button"
                            onClick={() => handleAddToBasket(product)}
                        >
                            Add to basket
                        </button>
                    </div>
                    <div className="product-details">
                        <h4 className="product-name">{product.name}</h4>
                        <p className="product-price">{product.price} {product.currency}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Carousel;