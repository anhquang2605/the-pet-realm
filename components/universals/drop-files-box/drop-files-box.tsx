import React, { useCallback } from 'react';
import style from './drop-files-box.module.css';
import { FileRejection, useDropzone } from 'react-dropzone';
import { StatusType } from '../../../types/status';

interface DropFilesBoxProps {
   allowedFormats?: string[];
   customeClassName?: string;
   uploadingFiles?: File[];
   setFileUploadingStatus?: (status: StatusType) => void;
    setFileUploadingMessage?: (message: string) => void;
  
}
  export const isFilesTypeValid = (file: File[], allowedTypes: string[]): boolean => {
        for (let i = 0; i < file.length; i++) {
        if (!allowedTypes.includes(file[i].type)) {
            return false;
        }
        }
        return true;
    }
const DropFilesBox: React.FC<DropFilesBoxProps> = ({

    allowedFormats = [''],
    uploadingFiles = [],
    customeClassName = '',
}) => {
    const [status, setStatus] = React.useState<StatusType>('idle');
    const [message, setMessage] = React.useState('');
    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const  areFilesValid = isFilesTypeValid(acceptedFiles, allowedFormats);
    }, []);
    const fileTypes = allowedFormats.length > 0 ? allowedFormats.map(format => `.${format}`).join(',') : undefined;
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    //Files handlers
    

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
            {uploadingFiles.length > 0 && (
            <div className={"mt-4 " + style['full']}>
                <h4 className="text-sm font-medium  ">Uploaded Images:</h4>
                <div className="grid grid-cols-3 gap-4">
                    {uploadingFiles.map((url, index) => (
                    <div key={index} className="relative group">
                        <img
                        src={url}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                        type="button"
                        onClick={() => removeFile(index)}
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