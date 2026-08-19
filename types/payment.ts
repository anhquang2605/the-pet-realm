import { ObjectId } from "mongodb";

export interface Payments {
   paymentIntentId: string; //stripe
    expiryDate: string; // Format: MM/YY
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export interface PaymentMethod extends Payments {
    id: string | ObjectId;
    dateCreated: Date;
    last4Digits: string;
    methodType: 'credit' | 'debit' | 'paypal' | 'other'; // Example types
    paymentIntentId: string; // For tracking payment intents if using a service like Stripe
}
export interface Shipping{
    recipientName: string;
    email: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
}