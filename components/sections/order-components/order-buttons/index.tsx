import React, {useState, useEffect} from 'react';
import style from './order-buttons.module.css';
import { useOrderContext } from '../useOrderContext';
import ActionButton from '../../../universals/buttons/action-button/action-button';

type OrderButtonsProps = Record<string, never>;

const OrderButtons: React.FC<OrderButtonsProps> = ({}) => {
    const {sectionName, setSectionName} = useOrderContext();
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-buttons']}>
            <ActionButton type='main' onClick={() => setSectionName('paymnent')} title='Order'/>
        </div>
    );
};

export default OrderButtons;