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
}

const OrderFilter: React.FC<OrderFilterProps> = ({}) => {
    return (
        <section className={style['order-filter']}>
            <h2>Filter Orders</h2>
            {/* Filter UI elements go here */}
            
        </section>
    );
};

export default OrderFilter;