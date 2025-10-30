import React, { useState } from 'react';
import style from './order-form.module.css';
import { Order } from '../../../../types/order';
import axios from 'axios';
interface OrderFormProps {
  onSubmit: (orderData: OrderFormData) => void;
  status: 'idle' | 'submitting' | 'success' | 'error';
}
export interface OrderFormData{
    name: string;
    price: number;
    description: string;
    discount: number;
    isFeatured: boolean;
}
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
    const [isUploading, setIsUploading] = useState(false);

    // Handlers and logic for form submission, image upload, etc. would go here
    // Free image hosting service - using ImgBB (free tier available)
    const uploadToImgBB = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);
        
        // Using ImgBB API (you need to get a free API key from https://api.imgbb.com/)
        const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}`,
        formData
        );
        
        return response.data.data.url;
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        setIsUploading(true);
        
        try {
        const uploadPromises = Array.from(files).map(file => uploadToImgBB(file));
        const urls = await Promise.all(uploadPromises);
        setUploadedImages(prev => [...prev, ...urls]);
        } catch (error) {
        console.error('Error uploading images:', error);
        alert('Error uploading images. Please try again.');
        } finally {
        setIsUploading(false);
        // Clear the file input
        event.target.value = '';
        }
    };

    const removeImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
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

    return (
        <div className={style['order-form'] + ' ' + "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Order</h2>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Order Name *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter order name"
                />
                </div>

                {/* Price Field */}
                <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                />
                </div>

                {/* Discount Field */}
                <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                />
                </div>

                {/* Description Field */}
                <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter order description"
                />
                </div>

                {/* Image Upload */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="image-upload"
                    />
                    <label
                    htmlFor="image-upload"
                    className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                        isUploading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    >
                    {isUploading ? 'Uploading...' : 'Choose Images'}
                    </label>
                    <p className="mt-2 text-sm text-gray-500">
                    Upload multiple images at once
                    </p>
                </div>

                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                    <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {uploadedImages.map((url, index) => (
                        <div key={index} className="relative group">
                            <img
                            src={url}
                            alt={`Uploaded ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                            ×
                            </button>
                        </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center">
                <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                    Feature this order
                </label>
                </div>

                {/* Status Display (Read-only) */}
                <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                    Status: <span className="font-medium text-green-600">Fresh</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Status is automatically set to "fresh" for new orders
                </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    disabled={status === 'submitting' || isUploading || !formData.name || formData.price <= 0}
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-md transition-colors disabled:cursor-not-allowed"
                >
                    {status}
                </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;