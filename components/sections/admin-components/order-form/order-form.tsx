import React, { use, useEffect, useState } from 'react';
import style from './order-form.module.css';
import DropFilesBox from '../../../universals/drop-files-box/drop-files-box';
import { ErrorMessages, StatusType } from '../../../../types/status';
import axios from 'axios';
import { initializeErrorMessages } from '../../../../libs/helpers';
interface OrderFormProps {
  onSubmit: (orderData: OrderFormData) => void;
  status: 'idle' | 'submitting' | 'success' | 'error';
  setStatus: (status: 'idle' | 'submitting' | 'success' | 'error') => void;
}
export interface OrderFormData{
    name: string;
    price: number;
    description: string;
    discount: number;
    isFeatured: boolean;
}


const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const IMG_EXPIRATION_TIME = 10 ; //in seconds
const FIELDS = ['name', 'price', 'description', 'imageUrls', 'discount']
const OrderForm: React.FC<OrderFormProps> = ({
    onSubmit,
    status
}) => {
    // State for form data
    const [formData, setFormData] = useState<OrderFormData>({
        name: '',
        price: 0,
        description: '',
        discount: 0,
        isFeatured: true,
    });
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [stagingImages, setStagingImages] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ErrorMessages>(initializeErrorMessages(FIELDS)
    );
    const [formStatus, setFormStatus] = useState<StatusType>('idle');
    const [fileUploadStatus, setFileUploadStatus] = useState<StatusType>('idle');

    //form validation and other logic can be added here
    const validateForm = async (): Promise<ErrorMessages> => {
        const errors: ErrorMessages = initializeErrorMessages(FIELDS);
        if (!formData.name.trim()) {
            errors.name = { message: 'Name is required', valid: false };
        }
        if (formData.price <= 0) {
            errors.price = { message: 'Price must be greater than 0', valid: false };
        }
        if (!formData.description.trim()) {
            errors.description = { message: 'Description is required', valid: false };
        }
        if (formData.discount < 0 || formData.discount > 100) {
            errors.discount = { message: 'Discount must be between 0 and 100', valid: false };
        }
        return errors;
    }
    // Handlers and logic for form submission, image upload, etc. would go here
    // Free image hosting service - using ImgBB (free tier available)
    const uploadToImgBB = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);
        // Using ImgBB API (you need to get a free API key from https://api.imgbb.com/)
        const response = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=${IMG_EXPIRATION_TIME}&key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}`,
        formData
        ); 
        return response.data.data.url;
    };

    const handleImageUpload = async (files: File[]) => {
        setIsUploading(true);        
        try {
            const uploadPromises = Array.from(files).map(file => uploadToImgBB(file));
            const urls = await Promise.all(uploadPromises);
            setUploadedImages(prev => [...prev, ...urls]);
            return true;
        } catch (error) {
            setFormStatus('error');
            setValidationErrors(prev => ({
                ...prev,
                imageUrls: { message: 'Failed to upload images. Please try again.', valid: false },
            }));
            return false;
        } finally {
            setIsUploading(false);
            // Clear the file input
        }
    };


    const handleSubmit = async() => {
        const errors = await validateForm();
        if (Object.values(errors).some(error => !error.valid)) {
            setValidationErrors(errors);
            return;
        }
        const status = await handleImageUpload(stagingImages);
        if (!status) return;
         const orderData = {
        ...formData,
        status: 'fresh' as const,
        imageUrls: uploadedImages,
        };

        onSubmit(orderData); 
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: checked,
        }));
    };

    const removeFile = (index: number) => {
        setStagingImages((prev) => { 
            const curItems = [...prev];
            curItems.filter((_, i) => i !== index)
            return curItems;
        });
    }
    useEffect(() => {
        
    }, []);
    return (
        <div className={style['order-form'] + ' ' + "mx-auto rounded-lg shadow-md flex flex-col"}>
            <h2 className="text-2xl font-bold mb-1 text-slate-200"> ✨ Create New Order ✨</h2>
            {/* Form */}
            <form  className=" flex">
                {/* Name Field */}
                <div className={style['full']}>
                    <label htmlFor="name" className="block text-sm font-medium  ">
                        Order Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={"w-full " + {}}
                        placeholder="Enter order name"
                    />
                </div>

                {/* Price Field */}
                <div className={style['half']}>
                <label htmlFor="price" className="block text-sm font-medium  ">
                    Price ($) *
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className=""
                    placeholder="0.00"
                />
                </div>

                {/* Discount Field */}
                <div className={style['half']}>
                <label htmlFor="discount" className="block text-sm font-medium  ">
                    Discount (%)
                </label>
                <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.01"
                    className=""
                    placeholder="0"
                />
                </div>
                {/* Featured Toggle */}
                <div className={style['half'] + " flex-row"}>
                <label htmlFor="isFeatured" className=" text-sm ">
                    Feature order ⭐
                </label>
                <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleCheckboxChange}
                    className=" text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-none"
                />

                </div>
                {/* Description Field */}
                <div className={style['full']}>
                    <label htmlFor="description" className="block text-sm font-medium  ">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className=""
                        placeholder="Enter order description"
                    />
                </div>

                {/* Image Upload */}
                <div className={style['full']} onClick={(e: React.MouseEvent)=>{
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    <label className="block text-sm font-medium  ">
                        Upload Images
                    </label>
                    <DropFilesBox allowedFormats={['image/jpeg', 'image/png', 'image/gif']}   uploadingFiles={
                        stagingImages
                    }
                        setUploadingFiles={
                            setStagingImages
                        }
                    customeClassName={"border-2 border-dashed border-gray-500 rounded-lg text-center flex-1 " + style['input-wannabe']} 
                    removeFile={removeFile}
                    />
                
                </div>

                

                {/* Status Display (Read-only) */}
                <div className={ style['input-wannabe'] + " w-full bg-gray-50 rounded-md py-2!important bg-gray-600 flex flex-col !important justify-center"}>
                    <p className="text-sm text-gray-300 text-center">
                        Status: <span className="font-bold text-green-600">Fresh</span>
                    </p>
                    <p className="text-xs text-gray-400 text-center">
                        Status is automatically set to &quot;fresh&quot; for new orders
                    </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-1 mt-0.5 font-bold">
                     <button
                        onClick={
                            handleSubmit
                        }
                        disabled={status === 'submitting' || isUploading || !formData.name || formData.price <= 0}
                        className=" text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-md transition-colors disabled:cursor-not-allowed px-2"
                    >
                        {status === 'idle' ? 'Create Order' : status === 'submitting' ? 'Submitting...' : status === 'success' ? 'Success!' : 'Error'}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => {
                        setFormData({
                            name: '',
                            price: 0,
                            description: '',
                            discount: 0,
                            isFeatured: true,
                        });
                        setUploadedImages([]);
                        }}
                        className="text-sm font-medium text-white  bg-red-500 hover:bg-red-400 rounded-md transition-colors"
                    >
                        Reset
                    </button>
                   
                </div>
            </form>
        </div>
    );
};

export default OrderForm;