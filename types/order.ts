import { ObjectId } from "mongodb";

export interface Order{
    name: string;
    id: string;
    price: number;
    dateCreated: Date;
    status: 'pending' | 'completed' | 'cancelled' | 'fresh'; // e.g., 'pending', 'completed', 'cancelled'
    description: string; // Optional field for additional details
    dateUpdated: Date; // Optional field for tracking updates
    orderImageUrls: string[]; // Array of image URLs associated with the order
    discount: number; // Optional field for discount percentage
    isFeatured: boolean;
}
export interface RawOrder{
     name: string;
    id: string;
    price: number;
    dateCreated: string; // ISO string format
    status: 'pending' | 'completed' | 'cancelled' | 'fresh'; // e.g., 'pending', 'completed', 'cancelled'
    description: string; // Optional field for additional details
    dateUpdated: string; // Optional field for tracking updates
    orderImageUrls: string[]; // Array of image URLs associated with the order
    discount: number; // Optional field for discount percentage
    isFeatured: boolean;
}
export interface FeatureItems{
    id: string | ObjectId;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    discount: number; //(from 0.1 to 1)
}

