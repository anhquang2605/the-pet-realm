import { ObjectId } from "mongodb";

export interface Order{
    name: string;
    id: string | ObjectId;
    price: number;
    dateCreated: Date;
    status: 'pending' | 'completed' | 'cancelled' | 'fresh'; // e.g., 'pending', 'completed', 'cancelled'
    description?: string; // Optional field for additional details
    dateUpdated?: Date; // Optional field for tracking updates
    orderImageUrls?: string[]; // Array of image URLs associated with the order
    discount?: number; // Optional field for discount percentage
}



