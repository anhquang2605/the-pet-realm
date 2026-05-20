import React, {useState, useEffect} from 'react';
import style from './order-payment.module.css';

type OrderPaymentProps = Record<string, never>;

const OrderPayment: React.FC<OrderPaymentProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-payment']}>
            OrderPayment
        </div>
    );
};

export default OrderPayment;