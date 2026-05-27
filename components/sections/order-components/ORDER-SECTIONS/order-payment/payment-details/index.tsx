import React, {useState, useEffect} from 'react';
import style from './payment-details.module.css';
import { useOrderContext } from './../../../useOrderContext';
import { Payments } from '../../../../../../types/payment';

type PaymentDetailsProps = Record<string, never>;

const PaymentDetails: React.FC<PaymentDetailsProps> = ({}) => {
    const {payment} = useOrderContext();

    useEffect(() => {

    }, []);

    return (
        <div className={style['payment-details']}>
                <h3 className={style['title']}>Payment Details</h3>
                <div className={style['payment-info']}>
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Card Number:</label> 
                        <input  type="text" value={payment.cardNumber || ''} readOnly />
                    </div>
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Expiration Date:</label> 
                        <input type="text" value={payment.expiryDate || ''} readOnly />
                    </div>
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>CVV:</label> 
                        <input type="text" value={payment.cvv || ''} readOnly />
                    </div>
                    {/* payment card holder name, billing address, city, state, postal code, country */}
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}  >Card Holder Name:</label> 
                        <input type="text" value={payment.cardHolderName || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Billing Address:</label> 
                        <input type="text" value={payment.billingAddress1 || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>    
                        <label className={style['payment-info-label']}>City:</label>    
                        <input type="text" value={payment.city || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>State:</label> 
                        <input type="text" value={payment.state || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Postal Code:</label> 
                        <input type="text" value={payment.postalCode || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Country:</label> 
                        <input type="text" value={payment.country || ''} readOnly />
                    </div>
                </div>
        </div>
    );
};

export default PaymentDetails;