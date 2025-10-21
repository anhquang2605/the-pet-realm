import React, { useState } from 'react';
import style from './order-form.module.css';
import { Order } from '../../../../types/order';
interface OrderFormProps {
  onSubmit: (orderData: Omit<Order, 'id' | 'dateCreated' | 'dateUpdated'>) => void;
  isLoading?: boolean;
}
interface OrderFormData{
    name: string;
    price: number;
    description: string;
    discount: number;
    isFeatured: boolean;
}
const OrderForm: React.FC<OrderFormProps> = ({}) => {
    const [formData, setFormData] = useState<OrderFormData>({
        name: '',
        price: 0,
        description: '',
        discount: 0,
        isFeatured: true,
    });
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    return (
        <div className={style['order-form']}>
            OrderForm
        </div>
    );
};

export default OrderForm;