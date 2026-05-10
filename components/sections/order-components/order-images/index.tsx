import React, {useState, useEffect} from 'react';
import style from './order-images.module.css';

type OrderImagesProps = Record<string, never>;

const OrderImages: React.FC<OrderImagesProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-images']}>
            OrderImages
        </div>
    );
};

export default OrderImages;