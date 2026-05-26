import React, {useState, useEffect} from 'react';
import style from './order-buttons.module.css';
import { useOrderContext } from '../useOrderContext';
import ActionButton from '../../../universals/buttons/action-button/action-button';

type OrderButtonsProps = Record<string, never>;

const OrderButtons: React.FC<OrderButtonsProps> = ({}) => {
    const {setSectionName} = useOrderContext();
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-buttons']}>
            <ActionButton color={'goldenrod'} type='main' onClick={() => setSectionName('payment')} title='Order'/>
        </div>
    );
};

export default OrderButtons;