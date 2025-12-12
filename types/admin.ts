import { ObjectId } from 'mongodb';
export type AdminAccount = {
    _id: string | ObjectId;
    password: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
