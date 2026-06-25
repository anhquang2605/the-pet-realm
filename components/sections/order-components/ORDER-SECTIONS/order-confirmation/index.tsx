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
        </section>
    );
};

export default OrderConfirmation;