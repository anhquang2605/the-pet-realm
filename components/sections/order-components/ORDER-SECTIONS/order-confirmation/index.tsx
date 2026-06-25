import React, {useState, useEffect} from 'react';
import style from './order-confirmation.module.css';

type OrderConfirmationProps = Record<string, never>;

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-confirmation']}>
            OrderConfirmation
        </div>
    );
};

export default OrderConfirmation;