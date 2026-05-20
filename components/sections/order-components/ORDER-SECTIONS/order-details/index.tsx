import React, {useState, useEffect} from 'react';
import style from './order-details.module.css';

type OrderDetailsProps = Record<string, never>;

const OrderDetails: React.FC<OrderDetailsProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-details']}>
            OrderDetails
        </div>
    );
};

export default OrderDetails;