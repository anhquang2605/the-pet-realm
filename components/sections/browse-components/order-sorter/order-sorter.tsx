import React from 'react';
import style from './order-sorter.module.css';

interface OrderSorterProps {

}

const OrderSorter: React.FC<OrderSorterProps> = ({}) => {
    return (
        <div className={style['order-sorter']}>
            OrderSorter
        </div>
    );
};

export default OrderSorter;