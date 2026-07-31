import React, { useEffect } from 'react';
import style from './page-styles/browse.module.css';
import { Order, RawOrder } from '../types/order';
import OrderFilter, { MobileFilterRevealButton } from '../components/sections/browse-components/use-order-fitler/order-filter';
import OrderSorter from '../components/sections/browse-components/order-sorter/order-sorter';
import OrderViewer from '../components/sections/browse-components/order-viewer/order-viewer';
import { OrderFilterI } from '../components/sections/browse-components/use-order-fitler/order-filter';
import { checkAdminRole } from '../libs/admin-check';
import { fetchFromGetAPI } from '../libs/api-interactions';
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
type BrowseProps  = Record<string, unknown>;
const fetchBrowseData = async () => {
    const isAdmin = await checkAdminRole(JWT_SECRET);
    const PATH = 'orders';
    const options = {
        status: '',
    }
    let orders = [];
    if (!isAdmin) { //only get orders for clients
        options.status = 'fresh';
         orders = await fetchFromGetAPI(PATH, options);
    } else {//return all orders for admin including the disabled ones 
        orders = await fetchFromGetAPI(PATH, {});
    }
    // Simulate fetching data for the browse page
    const data =  orders; // This would be replaced with an actual API call
    return data;
}
const fetchPriceRange: () => Promise<[number, number]> = async () => {
    const PATH = 'orders';
    const options = {
        isGettingPriceRange: 'true',
    }
    const priceRange = await fetchFromGetAPI(PATH, options);
    if (priceRange.minPrice === priceRange.maxPrice) {
        return [0, priceRange.maxPrice];
    }
    // Simulate fetching price range data
    return [priceRange.minPrice, priceRange.maxPrice]; // Example price range
}

const Browse: React.FC<BrowseProps> = () => {
    const [orderItems, setOrderItems] = React.useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = React.useState<Order[]>([]);
    const [orders, setOrders] = React.useState<RawOrder[]>([]);
    const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 1000]);
    const [filter, setFilter] = React.useState<OrderFilterI>({
        priceRange: [0, Infinity],
        isDiscounted: false,
        isOnHold: false,
        isAvailable: false,
    });
    //Sorter states
    const [isAscending, setIsAscending] = React.useState(true);
    const [sortBy, setSortBy] = React.useState<string>("Date");
    //admin check state
    const [isAdmin, setIsAdmin] = React.useState(false);
    //user Roles
    useEffect(() => {
        const browseData = fetchBrowseData();
        const priceRangeData = fetchPriceRange();
        Promise.all([browseData, priceRangeData]).then(([orders, range]) => {
            setOrders(orders);
            setPriceRange(range);
        })
    }, []);
    useEffect(() => {
        console.log('Price range updated:', priceRange);
    }, [priceRange]); 
    useEffect(()=>{ 
        const convertedOrders = convertToOrders(orders);
        setOrderItems(convertedOrders);
        setFilteredOrders(convertedOrders);
        setIsAdmin( (prev) => {
           let isAdmin = prev;
            checkAdminRole(JWT_SECRET).then(
                (role) => {
                    isAdmin = role === 'admin'; 
                }
           );
            return isAdmin;
        }
            
        )
    }, [orders]);
    useEffect(() => {
        if(orderItems.length > 0){
            const filtered = applyFilters(orderItems, filter);
            setFilteredOrders(filtered);
        }
    }, [filter]);
    useEffect(()=>{
        if(filteredOrders.length > 0){
            const sortedOrders = [...filteredOrders].sort((a, b) => {
                let comparison = 0;
                if (sortBy === "date") {
                    comparison = a.dateCreated.getTime() - b.dateCreated.getTime();
                } else if (sortBy === "price") {
                    comparison = a.price - b.price;
                } else if (sortBy === "name") {
                    comparison = a.name.localeCompare(b.name);
                }
                return isAscending ? comparison : -comparison;
            });
            setFilteredOrders(sortedOrders);
        }
    }, [isAscending, sortBy]);
    return (
        <div id="browse-page" className={style['browse']}>
            
           <OrderFilter setFilter={setFilter} priceRange={priceRange} />
           <section className={style['browse-main']}>
                <div className={style['browse-main__modification-group']}>
                    <MobileFilterRevealButton />
                    <OrderSorter
                    setSortBy={setSortBy}
                    setIsAscending={setIsAscending}
                    isAscending={isAscending}
                    />
                </div>
                
                <OrderViewer orders={filteredOrders} />
           </section>
           
        </div>
    );
};

const convertToOrders = (rawOrders: RawOrder[]): Order[] => {
    return rawOrders.map((rawOrder) => ({
        ...rawOrder,
        id: rawOrder._id.toString(),

        dateCreated: new Date(rawOrder.dateCreated),
        dateUpdated: new Date(rawOrder.dateUpdated),
    }));    
}
const applyFilters = (orders: Order[], filter: OrderFilterI) => {
    return orders.filter(order => {
        const withinPriceRange = order.price >= filter.priceRange[0] && order.price <= filter.priceRange[1];
        const matchesDiscount = filter.isDiscounted ? order.discount > 0 : true;
        const matchesOnHold = filter.isOnHold ? order.status === 'pending' : true;
        const matchesAvailability = filter.isAvailable ? order.status === 'fresh' : true;
        return withinPriceRange && matchesDiscount && matchesOnHold && matchesAvailability;
    });
}
export default Browse;