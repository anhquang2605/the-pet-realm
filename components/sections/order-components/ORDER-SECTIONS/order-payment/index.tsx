import React, {useState, useEffect} from 'react';
import style from './order-payment.module.css';
import { IoReturnUpBack } from "react-icons/io5";
import { useOrderContext } from '../../useOrderContext';
import PaymentDetails from './payment-details';
import Shipment from './shipment';
import Collapsable from '../../../../universals/collapsable';
import OrderPreview from '../../order-preview';

type OrderPaymentProps = Record<string, never>;
const COLLAPSABLE_SECTIONS_TITLES = ['1. Payment Details', '2. Shipping Information'];
const COLLAPSABLE_SECTIONS_ITEMS = [
    <PaymentDetails />,
    <Shipment />,
]
const OrderPayment: React.FC<OrderPaymentProps> = ({}) => {
    const {setSectionName, filledContent, currentFormStage, setCurrentFormStage} = useOrderContext();
    useEffect(() => {

    }, []);
    const handleBackClick = () => {
        setSectionName('details');
    }

    return (
        <div className={style['order-payment']}>
            <span className={style['back-button-container']}>
                <button className={style['back-button']} onClick={handleBackClick}><IoReturnUpBack />Back</button>
            </span>
            <section className={style['left-section']}>
                <Collapsable 
                    currentSection={currentFormStage}
                    items={COLLAPSABLE_SECTIONS_ITEMS}
                    titles={COLLAPSABLE_SECTIONS_TITLES}
                    filledContent={filledContent}
                    setCurrentSection={setCurrentFormStage}
                />
            </section>
            <section className={style['right-section']}>
                <OrderPreview />
            </section>
           
            
        </div>
    );
};

export default OrderPayment;

