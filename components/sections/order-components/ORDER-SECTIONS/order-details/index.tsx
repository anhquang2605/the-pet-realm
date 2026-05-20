import React, {useState, useEffect} from 'react';
import style from './order-details.module.css';
import OrderImages from '../../order-images';
import OrderInfos from '../../order-infos';
import OrderButtons from '../../order-buttons';

type OrderDetailsProps = Record<string, never>;

const OrderDetails: React.FC<OrderDetailsProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-details']}>
            <OrderImages />
            <OrderInfos />
            <OrderButtons />
        </div>
    );
};

export default OrderDetails;