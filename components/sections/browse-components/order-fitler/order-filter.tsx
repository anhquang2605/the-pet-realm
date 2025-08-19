import React from 'react';
import style from './order-filter.module.css';

interface OrderFilterProps {

}

const OrderFilter: React.FC<OrderFilterProps> = ({}) => {
    return (
        <div className={style['order-filter']}>
            OrderFilter
        </div>
    );
};

export default OrderFilter;