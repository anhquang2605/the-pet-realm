import { ObjectId } from "mongodb";

export interface Payments {
   paymentIntentId: string; //stripe
    orderId: string | ObjectId;
}
export interface PaymentMethod extends Payments {
    dateCreated: Date;
    last4Digits: string;
    methodType: 'credit' | 'debit' | 'paypal' | 'other'; // Example types
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