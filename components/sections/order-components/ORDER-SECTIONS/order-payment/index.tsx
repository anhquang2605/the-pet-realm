import React, {useState, useEffect} from 'react';
import style from './order-payment.module.css';
import { IoReturnUpBack } from "react-icons/io5";
import { useOrderContext } from '../../useOrderContext';

type OrderPaymentProps = Record<string, never>;

const OrderPayment: React.FC<OrderPaymentProps> = ({}) => {
    const {setSectionName} = useOrderContext();
    useEffect(() => {

    }, []);
    const handleBackClick = () => {
        setSectionName('details');
    }

    return (
        <div className={style['order-payment']}>
            <button><IoReturnUpBack />Back</button>
            OrderPayment
        </div>
    );
};

export default OrderPayment;