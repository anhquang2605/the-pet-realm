import React, {useState, useEffect} from 'react';
import style from './order-infos.module.css';

type OrderInfosProps = Record<string, never>;

const OrderInfos: React.FC<OrderInfosProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-infos']}>
            OrderInfos
        </div>
    );
};

export default OrderInfos;