import { useState, useEffect, useRef} from 'react';
//get params from url
import { useRouter } from 'next/router';
import { fetchFromGetAPI } from '../../libs/api-interactions';
import { RawOrder } from '../../types/order';

interface OrderPageProps {
    order: RawOrder | null;
}

export const getServerSideProps = async (context: any) => {
    const { id } = context.query;
    const path = "orders";
    try {
        const res = await fetchFromGetAPI(path, { id });
        return {
            props: {
                order: res
            }
        }
    } catch (error) {
        console.error('Error fetching order data:', error);
        return {
            props: {
                order: null,
            }
        }
    }
}
export default function OrdersPage( { order }: OrderPageProps) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Orders</h1>
            <p>Order ID: {id}</p>
        </div>
    );
}