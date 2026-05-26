import React, {useState, useEffect} from 'react';
import style from './shipment.module.css';

type ShipmentProps = Record<string, never>;

const Shipment: React.FC<ShipmentProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['shipment']}>
            Shipment
        </div>
    );
};

export default Shipment;