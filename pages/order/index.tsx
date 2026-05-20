import { useState, useEffect, useRef}  from 'react';
import { useSearchParams } from 'next/navigation';
//get params from url
import { useRouter } from 'next/router';
import { fetchFromGetAPI } from '../../libs/api-interactions';
import { RawOrder } from '../../types/order';
import style from '../page-styles/order.module.css';
import { OrderProvider } from '../../components/sections/order-components/useOrderContext';
import OrderInfos from '../../components/sections/order-components/order-infos';
import OrderImages from '../../components/sections/order-components/order-images';
import OrderButtons from '../../components/sections/order-components/order-buttons';
import OrderPageSectionSwitcher from '../../components/sections/order-components/order-page-section-switcher';
export default function OrdersPage( ) {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    
    return (
        <OrderProvider id={id} >
            <section className={style['order-page']}>
                <OrderPageSectionSwitcher />
            </section>
        </OrderProvider>
    );
}