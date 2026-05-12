import React, {useState, useEffect} from 'react';
import style from './order-recomendations.module.css';

type OrderRecomendationsProps = Record<string, never>;

const OrderRecomendations: React.FC<OrderRecomendationsProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-recomendations']}>
            OrderRecomendations
        </div>
    );
};

export default OrderRecomendations;