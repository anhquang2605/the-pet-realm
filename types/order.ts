import { ObjectId } from "mongodb";

export interface BaseOrder{
      name: string;
    price: number;
   
    status: 'pending' | 'paid' | 'cancelled' | 'fresh'; // e.g., 'pending', 'completed', 'cancelled'
    description: string; // Optional field for additional details
   
    imageUrls: string[]; // Array of image URLs associated with the order
    discount: number; // Optional field for discount percentage
    isFeatured: boolean;
    paymentId: string | ObjectId; // Optional field for payment identifier
    shipmentId: string | ObjectId; // Optional field for shipment identifier
}
export interface Order extends BaseOrder{
    id: string | ObjectId;
    dateCreated: Date;
    dateUpdated: Date;
}
export interface RawOrder extends BaseOrder{
    _id: ObjectId;
    dateCreated: string; // ISO string representation of the date
    dateUpdated: string; // ISO string representation of the date
}
export interface FeatureItems{
    id: string | ObjectId;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    discount: number; //(from 0.1 to 1)
}

export interface OrderImage{
    id: string | ObjectId;
    orderId: string | ObjectId;
    imageUrl: string;
    dateCreated: Date;
}

export interface ShopSuggestion{
    _id: string | ObjectId;
    name: string;
   image: string;
}
export interface OrderSummary{
    name: string;
    totalPrice: number; // Total price after applying discount
}