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
    const [
    minPrice = 0, maxPrice = 1000
    ] = priceRange;
    return (
        <section className={style['order-filter']}>
            <h2>Filter Orders</h2>
            {/* Filter UI elements go here */}
            <div className={`${style['price-range']}`}>
                <label>
                    Price Range:
                    
                </label>
                <span className={`${style['price-range-values']}`}>
                    <span className={`${style['min-price']}`}></span >

                    <span className={`${style['max-price']}`}></span>
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