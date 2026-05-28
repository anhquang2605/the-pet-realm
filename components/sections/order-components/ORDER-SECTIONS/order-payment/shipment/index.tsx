import React, {useState, useEffect} from 'react';
import style from './shipment.module.css';
import { Shipping } from '../../../../../../types/payment';
type ShipmentProps = {
    setShipping: React.Dispatch<React.SetStateAction<Shipping>>
}

const Shipment: React.FC<ShipmentProps> = ({ setShipping }) => {
    
    useEffect(() => {

    }, []);

    return (
        <div className={style['shipment']}>
                <h3 className={style['title']}>Shipment Details</h3>
                <div className={style['shipment-info']}>
                    <div className={style['shipment-info-item']}>   
                        <label className={style['shipment-info-label']}>Recipient Name:</label>
                        <input type="text" onChange={(e) => setShipping(prev => ({...prev, recipientName: e.target.value}))} className={style['shipment-info-input']} placeholder="Recipient Name" />
                    </div>
                    <div className={style['shipment-info-item']}>
                        <label className={style['shipment-info-label']}>Email:</label>
                        <input type="email" onChange={(e) => setShipping(prev => ({...prev, email: e.target.value}))} className={style['shipment-info-input']} placeholder="Email" />
                    </div>
                </div>
                <div className={style['shipment-info']}>
                    <div className={style['shipment-info-item']}>
                        <label className={style['shipment-info-label']}>City:</label>
                        <input type="text" onChange={(e) => setShipping(prev => ({...prev, city: e.target.value}))} className={style['shipment-info-input']} placeholder="City" />
                    </div>
                    <div className={style['shipment-info-item']}>
                        <label className={style['shipment-info-label']}>State:</label>
                        <input type="text" onChange={(e) => setShipping(prev => ({...prev, state: e.target.value}))} className={style['shipment-info-input']} placeholder="State" />
                    </div>
                </div>
                <div className={style['shipment-info']}>
                    <div className={style['shipment-info-item']}>
                        <label className={style['shipment-info-label']}>Postal Code:</label>
                        <input type="text" onChange={(e) => setShipping(prev => ({...prev, postalCode: e.target.value}))} className={style['shipment-info-input']} placeholder="Postal Code" />
                    </div>
                    <div className={style['shipment-info-item']}>
                        <label className={style['shipment-info-label']}>Country:</label>
                        <input type="text" onChange={(e) => setShipping(prev => ({...prev, country: e.target.value}))} className={style['shipment-info-input']} placeholder="Country" />
                    </div>
                </div>
            </div>
    );
};

export default Shipment;