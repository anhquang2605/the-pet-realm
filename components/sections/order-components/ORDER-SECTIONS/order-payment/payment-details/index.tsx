import React, {useState, useEffect} from 'react';
import style from './payment-details.module.css';
import { useOrderContext } from './../../../useOrderContext';
import { Payments } from '../../../../../../types/payment';

type PaymentDetailsProps = Record<string, never>;

const PaymentDetails: React.FC<PaymentDetailsProps> = ({}) => {
    const {payment, setPayment} = useOrderContext();
    
    //validation for payment details
    const validatePaymentDetails = () => {
        const cardNumberRegex = /^\d{16}$/;
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^\d{3}$/;
        if (!cardNumberRegex.test(payment.cardNumber)) {
            alert('Invalid card number. It should be 16 digits.');
            return false;
        }
        if (!expiryDateRegex.test(payment.expiryDate)) {
            alert('Invalid expiry date. It should be in MM/YY format.');
            return false;   
        }
        if (!cvvRegex.test(payment.cvv)) {
            alert('Invalid CVV. It should be 3 digits.');
            return false;
        }
        return true;
    }
    useEffect(() => {

    }, []);

    return (
        <div className={style['payment-details']}>
                <h3 className={style['title']}>Payment Details</h3>
                <div className={style['payment-info']}>
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Card Number:</label> 
                        <input className={style['payment-info-input']} onChange={(e) => setPayment(prev => ({...prev, cardNumber: e.target.value}))}  type="text" value={payment.cardNumber || ''} readOnly />
                    </div>
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Expiration Date:</label> 
                        <input className={style['payment-info-input']} onChange={(e) => setPayment(prev => ({...prev, expiryDate: e.target.value}))} type="text" value={payment.expiryDate || ''} readOnly />
                    </div>
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>CVV:</label> 
                        <input className={style['payment-info-input']} onChange={(e) => setPayment(prev => ({...prev, cvv: e.target.value}))} type="text" value={payment.cvv || ''} readOnly />
                    </div>
                    {/* payment card holder name, billing address, city, state, postal code, country */}
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}  >Card Holder Name:</label> 
                        <input className={style['payment-info-input']} onChange={(e) => setPayment(prev => ({...prev, cardHolderName: e.target.value}))} type="text" value={payment.cardHolderName || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Billing Address:</label> 
                        <input className={style['payment-info-input']} onChange={(e) => setPayment(prev => ({...prev, billingAddress1: e.target.value}))} type="text" value={payment.billingAddress1 || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>    
                        <label className={style['payment-info-label']}>City:</label>    
                        <input className={style['payment-info-input']} onChange={(e) => setPayment(prev => ({...prev, city: e.target.value}))} type="text" value={payment.city || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>State:</label> 
                        <input className={style['payment-info-input']} onChange={(e) => setPayment(prev => ({...prev, state: e.target.value}))} type="text" value={payment.state || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Postal Code:</label> 
                        <input className={style['payment-info-input']} onChange={(e) => setPayment(prev => ({...prev, postalCode: e.target.value}))} type="text" value={payment.postalCode || ''} readOnly />
                    </div>    
                    <div className={style['payment-info-item']}>
                        <label className={style['payment-info-label']}>Country:</label> 
                        <input className={style['payment-info-input']} onChange={(e) => setPayment(prev => ({...prev, country: e.target.value}))} type="text" value={payment.country || ''} readOnly />
                    </div>
                </div>
        </div>
    );
};

export default PaymentDetails;