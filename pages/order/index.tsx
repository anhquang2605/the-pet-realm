import { useSearchParams } from 'next/navigation';
//get params from url
import style from '../page-styles/order.module.css';
import { OrderProvider } from '../../components/sections/order-components/useOrderContext';
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