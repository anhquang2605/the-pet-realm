import React, {useState, useEffect} from 'react';
import style from './order-confirmation.module.css';
import { useOrderContext } from '../../useOrderContext';
type OrderConfirmationProps = Record<string, never>;

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({}) => {
    const {order, payment, shipping} = useOrderContext();
    useEffect(() => {

    }, []);

    return (
        <section className={style['order-confirmation']}>
            <h2 className={style['order-confirmation__title']}>We have received your order</h2>
            <p className={style['order-confirmation__message']}>Thank you for your purchase! Your order has been successfully placed. You will receive an email confirmation shortly with the details of your order and how to access it.</p>
            
        </section>
    );
};

export default OrderConfirmation;