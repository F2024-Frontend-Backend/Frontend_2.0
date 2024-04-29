import { useState, useEffect, useRef } from 'react';
import { fetchUpsellProducts, fetchRandomProducts } from '../../../api/axios';
import { Product } from '../../../types/types';
import './carousel.css';
import { useBasket } from '../../../hooks/useBasket';
import defaultImage from '../../../resources/defaultProductImage.png';

const Carousel = () => {
    const { basket, updateItemInBasket } = useBasket();
    const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
    const prevBasketLength = useRef(basket.length);
    

  useEffect(() => {
    const fecthAndSetCarouselProducts = async () => {
      if (basket.length > prevBasketLength.current) {
        const upsellIds = [
          ...new Set(
            basket
              .filter((item) => item.product.upsellProductID)
              .map((item) => item.product.upsellProductID)
          ),
        ];
        console.log("Upsell IDs:", upsellIds);
        try {
          if (upsellIds.length === 0) {
            const randomProducts = await fetchRandomProducts(5);
            setCarouselProducts(randomProducts);
            console.log("Carousel products", randomProducts);
          } else {
            const fetchedUpsellProducts = await fetchUpsellProducts(upsellIds);
            console.log("Upsell products", fetchedUpsellProducts);

            if (fetchedUpsellProducts.length < 5) {
              console.log("Fetching additional products");
              const additionalProducts = 5 - fetchedUpsellProducts.length;
              const randomProducts = await fetchRandomProducts(
                additionalProducts
              );
              fetchedUpsellProducts.push(...randomProducts);
            }
            setCarouselProducts(fetchedUpsellProducts);
            console.log("Carousel products", fetchedUpsellProducts);
          }
          prevBasketLength.current = basket.length;
        } catch (error) {
          console.error("Failed to fetch upsell products", error);
        }
      }
    };
    fecthAndSetCarouselProducts();
  }, [basket]);

  const handleAddToBasket = (product: Product) => {
    const existingItem = basket.find(
      (item) => item.product.string_id === product.string_id
    );
    if (existingItem) {
      updateItemInBasket({
        ...existingItem,
        quantity: existingItem.quantity + 1,
        sub_total: existingItem.sub_total + Number(product.price),
      });
    } else {
      updateItemInBasket({
        product: product,
        quantity: 1,
        sub_total: Number(product.price),
      });
    }
    console.log("Basket content", basket);
  };

    return (
        <div className='carousel-wrapper'>
        <div className="carousel">
            {carouselProducts.map((product, index) => (
                <div key={product.string_id || index} className="carousel-item">
                    <div className="carousel-product-image-wrapper">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="carousel-product-image"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = defaultImage;
                            }}
                        />
                        <button
                            className="add-to-basket-button"
                            onClick={() => handleAddToBasket(product)}
                        >
                            Add to basket
                        </button>
                    </div>
                    <div className="carousel-product-details">
                        <h4 className="carousel-product-name">{product.name}</h4>
                        <p className="carousel-product-price">{product.price} {product.currency}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

export default Carousel;
