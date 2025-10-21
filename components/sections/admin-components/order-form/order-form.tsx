import React from 'react';
import style from './order-form.module.css';
import { Order } from '../../../../types/order';
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