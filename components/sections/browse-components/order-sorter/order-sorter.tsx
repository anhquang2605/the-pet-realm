import React from 'react';
import style from './order-sorter.module.css';
import OrderFilter from '../order-fitler/order-filter';

interface OrderSorterProps {

}

const OrderSorter: React.FC<OrderSorterProps> = ({}) => {
    return (
        <div className={style['order-sorter']}>
            <OrderSorter />
            <OrderFilter />
            
        </div>
    );
};

export default OrderSorter;