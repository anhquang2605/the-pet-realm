import React from 'react';
import style from './order-filter.module.css';
export interface OrderFilterI {
    priceRange: [number, number];
    isDiscounted: boolean;
    isOnHold: boolean;
    isAvailable: boolean;
}
interface OrderFilterProps {
    setFilter: React.Dispatch<React.SetStateAction<OrderFilterI>>;
    priceRange: [number, number];
}

const OrderFilter: React.FC<OrderFilterProps> = ({priceRange}) => {
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];
    return (
        <section className={style['order-filter']}>
            <h2>Filter Orders</h2>
            {/* Filter UI elements go here */}
            <div className={`${style['price-range']}`}>
                <label>
                    Price Range:
                    
                </label>
                <span className={`${style['price-range-values']}`}>
                    <span className={`${style['min-price']}`}>{minPrice}</span >

                    <span className={`${style['max-price']}`}>{maxPrice}</span>
                </span>
               

            </div>
            <div className={`${style['checkbox-group']}`}>
                <label>
                    <input type="checkbox" />
                    Discounted
                </label>
                <label>
                    <input type="checkbox" />
                    On Hold
                </label>
                <label>
                    <input type="checkbox" />
                    Available
                </label>
            </div>
        </section>
    );
};

export default OrderFilter;