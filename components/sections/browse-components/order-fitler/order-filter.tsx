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
        <div className={style['order-filter']}>
            OrderFilter
        </div>
    );
};

export default OrderFilter;