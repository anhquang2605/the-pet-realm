import React, { useCallback } from 'react';
import style from './drop-files-box.module.css';
import { FileRejection, useDropzone } from 'react-dropzone';

interface DropFilesBoxProps {
    removeImage?: (index: number) => void;
    isUploading?: boolean;
    uploadedImages?: string[];
    handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customeClassName?: string;
    allowedFormats?: string[]
}

const DropFilesBox: React.FC<DropFilesBoxProps> = ({
    removeImage = () => {},
    isUploading = false,
    uploadedImages = [],
    handleImageUpload = () => {},
    customeClassName = '',
    allowedFormats = ['']
}) => {
    const [status, setStatus] = React.useState<'idle' | 'uploading' | 'error' >('idle');
    const [message, setMessage] = React.useState('');
    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        console.log('Accepted files:', acceptedFiles);
    }, []);
    const fileTypes = allowedFormats.length > 0 ? allowedFormats.map(format => `.${format}`).join(',') : undefined;
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <div  {...getRootProps()} className={style['drop-files-box'] + " " + customeClassName}>
            <input
            type="file"
            multiple
            accept={fileTypes}
            onChange={handleImageUpload}
            disabled={isUploading}
            className="hidden"
            id="image-upload"
            {...getInputProps()}
            />
            <label
            htmlFor="image-upload"
            className={`cursor-pointer inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md ${
                isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            >
            {isUploading ? 'Uploading...' : 'Choose Images'}
            </label>
            <p className="mt-2 text-sm text-gray-500">
            {isDragActive
                ? 'Drop the files here...'
                : 'Drag and drop files here, or click to select files'}
            </p>

            {/* Uploaded Images Preview */}
            {uploadedImages.length > 0 && (
            <div className={"mt-4 " + style['full']}>
                <h4 className="text-sm font-medium  ">Uploaded Images:</h4>
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
    );
};

export default DropFilesBox;