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

    //form validation and other logic can be added here
    const validateForm = async (uploadStatus?: boolean): Promise<ErrorMessages> => {
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
        if (stagingImages.length === 0) {
            errors.imageUrls = { message: 'At least one image is required', valid: false };
        }
        if (uploadStatus === false) {
            errors.imageUrls = { message: 'Image upload failed. Please try again.', valid: false };
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
            setIsUploading(false); 
            return true;
        } catch (error) {
            setFormStatus('error');
            setValidationErrors(prev => ({
                ...prev,
                imageUrls: { message: 'Failed to upload images. Please try again.', valid: false },
            }));
            setIsUploading(false);
            return false;
        } 
    };


    const handleSubmit = async() => {
        setFormStatus('submitting');
        const status = await handleImageUpload(stagingImages);
        const errors = await validateForm(status);
        setValidationErrors(errors);

        //onSubmit(orderData); 
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
            curItems.splice(index, 1);
            return curItems
        });
    }
    const handleReset = () => {
        setFormData({
            name: '',
            price: 0,
            description: '',        
            discount: 0,
            isFeatured: false,
        });
        setUploadedImages([]);
        setStagingImages([]);
        setValidationErrors(initializeErrorMessages(FIELDS));
        setFormStatus('idle');
    }
    const checkIfDisabled = () => {
        return !(
            formData.name.trim() &&
            formData.price > 0 &&
            formData.description.trim() &&
            formData.discount >= 0 &&
            formData.discount <= 1 &&
            stagingImages.length > 0
        );
    }
    const preventOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const checkErrorMessages = (errors: ErrorMessages[]) => {
        return errors.some(error => Object.values(error).some(fieldError => !fieldError.valid && fieldError.message !== ''));
    }
    useEffect(() => {
        //check this logic here
        if(formStatus === 'submitting') {
            if (checkErrorMessages([validationErrors])) {
                setFormStatus('error');
            } else {
                setFormStatus('success');
            }    
        }
    }, [validationErrors]);
    useEffect(() => {
        if (formStatus === 'success' ) {      
             const orderData = {
            ...formData,
             status: 'fresh' as const,
            imageUrls: [...uploadedImages],
            };
            onSubmit(orderData);
            handleReset();
        }
    }, [formStatus]);
    return (
        <div className={style['order-form'] + ' ' + "mx-auto rounded-lg shadow-md flex flex-col"}>
            <h2 className="text-2xl font-bold mb-1 text-slate-200"> ✨ Create New Order ✨</h2>
            {/* Form */}
            <form onSubmit={preventOnSubmit}  className=" flex">
                {/* Name Field */}
                <div className={style['full'] + ' ' + (validationErrors.name?.valid ? '' : 'border-red-500') }>
                    <span className="text-red-500">{validationErrors.name?.message}</span>
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
                <div className={style['half'] + ' ' + (validationErrors.price?.valid ? '' : 'border-red-500')}>
                <span className="text-red-500">{validationErrors.price?.message}</span>
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
                />
                </div>

                {/* Discount Field */}
                <div className={style['half'] + ' ' + (validationErrors.discount?.valid ? '' : 'border-red-500')}>
                <span className="text-red-500">{validationErrors.discount?.message}</span>
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
                <div className={style['full'] + ' ' + (validationErrors.description?.valid ? '' : 'border-red-500')}>
                    <span className="text-red-500">{validationErrors.description?.message}</span>
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
                <div className={style['full'] + (validationErrors.images?.valid ? ' ' : ' border-red-500')}>
                    <span className="text-red-500">{validationErrors.images?.message}</span>
                    <label className="block text-sm font-medium  ">
                        Upload Images *
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
                {/* Note*/}
                <span>
                    <p className=" text-gray-400 text-center flex align-center">
                        <span className="text-2xl">*</span> Required fields
                    </p>
                </span>

                {/* Submit Button */}
                <div className="flex justify-end gap-1 mt-0.5 font-bold">
                     <button
                        onClick={
                            handleSubmit
                        }
                        disabled={status === 'submitting' || isUploading || checkIfDisabled()}
                        className=" text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-md transition-colors disabled:cursor-not-allowed px-2"
                    >
                        {status === 'idle' ? 'Create Order' : status === 'submitting' ? 'Submitting...' : status === 'success' ? 'Success!' : 'Error'}
                    </button>
                    
                    <button
                        onClick={handleReset}
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