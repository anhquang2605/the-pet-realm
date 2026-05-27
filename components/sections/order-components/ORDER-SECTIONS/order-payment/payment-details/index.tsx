import React, {useState, useEffect} from 'react';
import style from './payment-details.module.css';
import { useOrderContext } from './../../../useOrderContext';
import { Payments } from '../../../../../../types/payment';

type PaymentDetailsProps = Record<string, never>;

const PaymentDetails: React.FC<PaymentDetailsProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['payment-details']}>
            PaymentDetails
        </div>
    );
};

export default PaymentDetails;