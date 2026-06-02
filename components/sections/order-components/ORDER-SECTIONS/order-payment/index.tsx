import React, {useState, useEffect} from 'react';
import style from './order-payment.module.css';
import { IoReturnUpBack } from "react-icons/io5";
import { FilledContent, useOrderContext } from '../../useOrderContext';
import PaymentDetails from './payment-details';
import Shipment from './shipment';

type OrderPaymentProps = Record<string, never>;

const OrderPayment: React.FC<OrderPaymentProps> = ({}) => {
    const {setSectionName, filledContent} = useOrderContext();
    const [completedSections, setCompletedSections] = useState<FilledContent>(
        {
            details: false,
            shipment: false
        }
    );
    useEffect(() => {

    }, []);
    const handleBackClick = () => {
        setSectionName('details');
    }

    return (
        <div className={style['order-payment']}>
            <button className={style['back-button']} onClick={handleBackClick}><IoReturnUpBack />Back</button>
            <h3 className={style['title']}>Payment</h3>
            <PaymentDetails />
            <Shipment/>
        </div>
    );
};

export default OrderPayment;

