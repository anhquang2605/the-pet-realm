import {createContext, useState, useEffect } from 'react';
import { Order, RawOrder } from '../../../types/order';

type OrderContextType = {
    order: RawOrder | null,
    setOrder: React.Dispatch<React.SetStateAction<any>>
}

interface OrderProviderProps {
    children: React.ReactNode;
    mainOrder: RawOrder | null;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<OrderProviderProps> = ({ children, mainOrder }) => {
    const [order, setOrder] = useState<RawOrder | null>(mainOrder);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
}