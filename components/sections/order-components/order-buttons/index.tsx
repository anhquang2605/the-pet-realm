import React, {useState, useEffect} from 'react';
import style from './order-buttons.module.css';

type OrderButtonsProps = Record<string, never>;

const OrderButtons: React.FC<OrderButtonsProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-buttons']}>
            OrderButtons
        </div>
    );
};

export default OrderButtons;