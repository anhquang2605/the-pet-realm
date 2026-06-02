import React, {useState, useEffect} from 'react';
import style from './order-payment.module.css';
import { IoReturnUpBack } from "react-icons/io5";
import { useOrderContext } from '../../useOrderContext';
import PaymentDetails from './payment-details';
import Shipment from './shipment';
import Collapsable from '../../../../universals/collapsable';

type OrderPaymentProps = Record<string, never>;
const COLLAPSABLE_SECTIONS_TITLES = ['Payment Details', 'Shipping Information'];
const COLLAPSABLE_SECTIONS_ITEMS = [
    <PaymentDetails />,
    <Shipment />
]
const OrderPayment: React.FC<OrderPaymentProps> = ({}) => {
    const {setSectionName, filledContent, currentFormStage} = useOrderContext();
    useEffect(() => {

    }, []);
    const handleBackClick = () => {
        setSectionName('details');
    }

    return (
        <div className={style['order-payment']}>
            <button className={style['back-button']} onClick={handleBackClick}><IoReturnUpBack />Back</button>
            <h3 className={style['title']}>Payment</h3>
            <Collapsable 
                currentSection={currentFormStage}
                items={COLLAPSABLE_SECTIONS_ITEMS}
                titles={COLLAPSABLE_SECTIONS_TITLES}
                filledContent={filledContent}
            />
        </div>
    );
};

export default OrderPayment;

