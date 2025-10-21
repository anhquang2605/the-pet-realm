import React from 'react';
import style from './order-form.module.css';

interface OrderFormProps {

}

const OrderForm: React.FC<OrderFormProps> = ({}) => {
    return (
        <div className={style['order-form']}>
            OrderForm
        </div>
    );
};

export default OrderForm;