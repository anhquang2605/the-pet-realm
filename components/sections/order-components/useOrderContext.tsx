import {createContext, useState, useEffect, useContext } from 'react';
import { Order, OrderSummary, RawOrder } from '../../../types/order';
import { fetchFromGetAPI, insertToPostAPI, updateToPutAPI } from '../../../libs/api-interactions';
import style from './use-order-context.module.css';
import { Payments, Shipping } from '../../../types/payment';
import { MOCK_PAYMENT, MOCK_SHIPPING } from '../../../local_data/mock-payment-data';
export type FilledContent = {
    [key: string]: boolean;
};


type OrderContextType = {
    order: RawOrder | null,
    setOrder: React.Dispatch<React.SetStateAction<RawOrder | null>>
    sectionName: string;
    setSectionName: React.Dispatch<React.SetStateAction<string>>
    payment: Payments;
    setPayment: React.Dispatch<React.SetStateAction<Payments>>
    shipping: Shipping;
    setShipping: React.Dispatch<React.SetStateAction<Shipping>>
    apiStatus: 'idle' | 'loading' | 'error' | 'success';
    setApiStatus: React.Dispatch<React.SetStateAction<'idle' | 'loading' | 'error' | 'success'>>;
    filledContent: {
        [key: string]: boolean;
    };
    setFilledContent: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
    setCurrentFormStage: React.Dispatch<React.SetStateAction<number>>;
    currentFormStage: number;
    isReadyToSubmit: () => boolean;
    orderSummary: OrderSummary | null;
    setOrderSummary: React.Dispatch<React.SetStateAction<OrderSummary | null>>;
}

interface OrderProviderProps {
    children: React.ReactNode;
    id: string | null;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<OrderProviderProps> = ({ children, id }) => {
    const [order, setOrder] = useState<RawOrder | null>(null);
    const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
    const [sectionName, setSectionName] = useState<string>('details');
    const [filledContent, setFilledContent] = useState<{ [key: string]: boolean; }>({});
    const [currentFormStage, setCurrentFormStage] = useState<number>(1);
    const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
    const [payment, setPayment] = useState<Payments>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',
        billingAddress1: '',
        billingAddress2: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });
    const [shipping, setShipping] = useState<Shipping>({
        recipientName: '',
        email: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
    });
    const getOrderDetails = async (id: string) => {
        setApiStatus('loading');
        const path = 'orders';
        try {
            const response = await fetchFromGetAPI(path, { id });
            setOrder(response[0]);
            setApiStatus('success');
        } catch (error) {
            console.error('Error fetching order details:', error);
            setApiStatus('error');
        }
    }
    const isPaymentFullyFilled = () => {
        for ( const [key, value] of Object.entries(payment)) {
            if (value === '' || value === null) {
                return false;
            } else if (key === 'billingAddress2') {
                continue; // Skip billingAddress2 as it's optional
            }
        }
        return true;
    }

    const isShippingFullyFilled = () => {
        for ( const [key, value] of Object.entries(shipping)) {
            if (value === '' || value === null) {
                return false;
            }
        }
        return true;
    }
    const isReadyToSubmit = () => {
        return isPaymentFullyFilled() && isShippingFullyFilled();
    }
      
    const deliverContextByStatus = () => {
        switch (apiStatus) {
            case 'loading':
                return <div className={style.loading}>Loading...</div>;
            case 'error':
                return <div className={style.error}>Error loading order details.</div>;
            case 'success':
                return children;
            default:
                return null;
        }
    }
    const submitShipping = async () => {
        let response;
        try {
            response = await insertToPostAPI('shipping', shipping);
        } catch (error) {
            console.error('Error submitting shipping:', error);
            return;
        }
        return response;
    }
    const submitPayment = async () => {
        let response;
        try {
            response = await insertToPostAPI('payments', payment);
        } catch (error) {
            console.error('Error submitting payment:', error);
            return;
        }
        return response;
    }
    const updateOrder  = async (updatedOrder: RawOrder) => {
        console.log('Updating order with data:', updatedOrder);
        //const response = await updateToPutAPI('orders', updatedOrder);
        //return response;
    }
    const submitOrder = async () => {

        if(!order) 
            {
                console.log('Order not found');    
                return;
            }

        const shippingResponse = await submitShipping();
        const paymentResponse = await submitPayment();
        const updatedOrder: RawOrder = {
            ...order,
            shipmentId: shippingResponse?.id || order.shipmentId,
            paymentId: paymentResponse?.id || order.paymentId,
            dateUpdated: new Date().toISOString()
        };

        try {
            const response = await updateOrder(updatedOrder);
            console.log('Order updated successfully:', response);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    }
    useEffect(() => {
        if(sectionName === 'confirmation') {
            submitOrder();
        }
    }, [sectionName]);
    useEffect(() => {
        if (id) {
            getOrderDetails(id);
        }
    }, [id]);
    useEffect(() => {

    }, [order, ])
    return (
        <OrderContext.Provider value={{ order, setOrder, sectionName, setSectionName, payment, setPayment, shipping, setShipping, apiStatus, setApiStatus, filledContent, setFilledContent, setCurrentFormStage, currentFormStage, isReadyToSubmit, orderSummary, setOrderSummary }}>
            {deliverContextByStatus()}
        </OrderContext.Provider>
    );
}

export function useOrderContext(): OrderContextType{
    const context = useContext(OrderContext);
    if(!context){
        throw new Error('useOrder must be used within a OrderProvider');
    }
    return context;
}
