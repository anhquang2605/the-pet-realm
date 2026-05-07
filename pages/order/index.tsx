import { useState, useEffect, useRef} from 'react';
//get params from url
import { useRouter } from 'next/router';


export default function OrdersPage() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Orders</h1>
            <p>Order ID: {id}</p>
        </div>
    );
}