import React, {useState, useEffect, useMemo} from 'react';
import style from './order-payment.module.css';
import { IoReturnUpBack } from "react-icons/io5";
import { useOrderContext } from '../../useOrderContext';
import PaymentDetails from './payment-details';
import Shipment from './shipment';
import Collapsable from '../../../../universals/collapsable';
import OrderPreview from '../../order-preview';
import ActionButton from '../../../../universals/buttons/action-button/action-button';
import { loadStripe } from '@stripe/stripe-js';
import {CheckoutElementsProvider} from '@stripe/react-stripe-js/checkout';
import { getFromPOSTAPI } from '../../../../../libs/api-interactions';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
type OrderPaymentProps = Record<string, never>;
const COLLAPSABLE_SECTIONS_TITLES = ['1. Payment Details', '2. Shipping Information'];
const COLLAPSABLE_SECTIONS_ITEMS = [
    <PaymentDetails key={1} />,
    <Shipment key={2} />,
]
//appearance constant

const OrderPayment: React.FC<OrderPaymentProps> = ({}) => {
    const [clientSecret, setClientSecret] = useState("");
    const {setSectionName, filledContent, currentFormStage, setCurrentFormStage} = useOrderContext();
    const handleBackClick = () => {
        setSectionName('details');
    }
    async function loadClientSecret() {
        const res = await getFromPOSTAPI('/stripe/create-checkout-session', { amount: 1000 }); // Replace with your actual API endpoint and parameters
        console.log(res);
        setClientSecret(res.clientSecret);
    }
    //payment element styles
    const appearance = {
        theme: 'stripe' as const,
/*         variables: {
            colorBackground: '#1e2939',
            colorText: '#30313d',
            colorBorder: 'lightgray',
            fontFamily: 'Montserrat, sans-serif',
            labelColorText: 'white',
            colorTextPlaceholder: '#777',
            tabIconMoreHoverColor: 'white',
            accordionItemLabelColorText: 'white',
            accordionItemLabelSelectedColorText: 'white',
            colorTextSecondary: 'white',
            buttonColorText: 'white',
            inputSelectOptionTextColor: 'white',
        },
        rules: {
            '.Dropdown':{
                color: 'white',
            }
        }, */
    }
    useEffect(() => {
        loadClientSecret();
    }, []);
    if (!clientSecret) {
        return <div>Loading...</div>;
    }
    return (
        
        <CheckoutElementsProvider stripe={stripePromise} options={{clientSecret}}>
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

