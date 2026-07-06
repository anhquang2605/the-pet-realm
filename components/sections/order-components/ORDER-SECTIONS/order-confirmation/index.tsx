import React, {useState, useEffect} from 'react';
import style from './order-confirmation.module.css';
import { useOrderContext } from '../../useOrderContext';
import FieldsDisplayer from '../../../../universals/fields-displayer';
import ActionButton from '../../../../universals/buttons/action-button/action-button';
type OrderConfirmationProps = Record<string, never>;

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({}) => {
    const {orderSummary, payment, shipping, order} = useOrderContext();
    useEffect(() => {

    }, []);

    return (
        <section className={style['order-confirmation']}>
            <h2 className={style['order-confirmation__title']}>We have received your order</h2>
            <p className={style['order-confirmation__message']}>Thank you for your purchase! Your order has been successfully placed. You will receive an email confirmation shortly with the details of your order and how to access it.</p>
            {orderSummary && order && <FieldsDisplayer items={[orderSummary]} imageUrl={order.imageUrls[0]} sectionTitle="Order Details" />}
            {payment && <FieldsDisplayer items={[payment]} sectionTitle="Payment Details" />}
            {shipping && <FieldsDisplayer items={[shipping]} sectionTitle="Shipping Details" />}
            <p className={style['order-confirmation__message']}>If you have any questions or need assistance, please contact our support team.</p>
            <p className={style['order-confirmation__message']}>We look forward to serving you!</p>
            <ActionButton isDisabled={false} title='Back to Home' color='goldenrod' type='main' onClick={() => window.location.href = '/'} />
        </section>
    );
};

export default OrderConfirmation;