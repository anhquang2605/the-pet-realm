import React, {useState, useEffect, useMemo} from 'react';
import style from './order-payment.module.css';
import { IoReturnUpBack } from "react-icons/io5";
import { useOrderContext } from '../../useOrderContext';
import PaymentDetails from './payment-details';
import Shipment from './shipment';
import Collapsable from '../../../../universals/collapsable';
import OrderPreview from '../../order-preview';
import ActionButton from '../../../../universals/buttons/action-button/action-button';

type OrderPaymentProps = Record<string, never>;
const COLLAPSABLE_SECTIONS_TITLES = ['1. Shipping information', '2. Payment Details'];
const COLLAPSABLE_SECTIONS_ITEMS = [
    <Shipment key={1} />,
    <PaymentDetails key={2} />,
]
//appearance constant

const OrderPayment: React.FC<OrderPaymentProps> = ({}) => {

    const {setSectionName, filledContent, currentFormStage, setCurrentFormStage, order} = useOrderContext();
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
        </CheckoutElementsProvider>
    );
};

export default OrderPayment;

