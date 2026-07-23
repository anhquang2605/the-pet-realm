import React, {useState, useEffect} from 'react';
import style from './order-payment.module.css';
import { IoReturnUpBack } from "react-icons/io5";
import { useOrderContext } from '../../useOrderContext';
import PaymentDetails from './payment-details';
import Shipment from './shipment';
import Collapsable from '../../../../universals/collapsable';
import OrderPreview from '../../order-preview';
import ActionButton from '../../../../universals/buttons/action-button/action-button';

type OrderPaymentProps = Record<string, never>;
const COLLAPSABLE_SECTIONS_TITLES = ['1. Payment Details', '2. Shipping Information'];
const COLLAPSABLE_SECTIONS_ITEMS = [
    <PaymentDetails key={1} />,
    <Shipment key={2} />,
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
                <ActionButton color='tomato' type='link' classNames={style['back-button']} onClick={handleBackClick} title= { 
                     <>
                        <IoReturnUpBack size={28} />
                        <span>Back</span>   
                     </>                     } />
                  
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

