import React, { JSX, ReactHTMLElement, useCallback, useEffect } from 'react';
import style from './drop-files-box.module.css';
import { FileRejection, useDropzone } from 'react-dropzone';
import { StatusType } from '../../../types/status';
import ActionButton from '../buttons/action-button/action-button';
import ImagePreview from '../image-preview/image-preview';

interface DropFilesBoxProps {
    allowedFormats?: string[];
    customeClassName?: string;
    uploadingFiles?: File[];
    setFileUploadingStatus?: (status: StatusType) => void;
    removeFile?: (index: number) => void;
    setUploadingFiles?: (files: File[]) => void;
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
    setUploadingFiles = () => {},
    customeClassName = '',
    removeFile = () => {},
    setFileUploadingStatus = () => {},
}) => {
    const [status, setStatus] = React.useState<StatusType>('idle');
    const [message, setMessage] = React.useState('');
    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const  areFilesValid = isFilesTypeValid(acceptedFiles, allowedFormats);
        if (areFilesValid) {
            statusSetter('success');
            setUploadingFiles(acceptedFiles);   
        } else {
            statusSetter('error');
            setMessage('Invalid file type. Only JPEG, PNG, and GIF files are allowed.');
        }
    }, []);
    const fileTypes = allowedFormats.length > 0 ? allowedFormats.map(format => `.${format}`).join(',') : undefined;
    
        //Files handlers
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    const handlefileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files);
            console.log('Selected files:', filesArray);
            const areFilesValid = isFilesTypeValid(filesArray, allowedFormats);
            if (areFilesValid) {
                statusSetter('success');
            } else {
                statusSetter('error');
                setMessage('Invalid file type. Only JPEG, PNG, and GIF files are allowed.');
            }
            setUploadingFiles(filesArray);
        }
    };
    //error handlers
    const statusSetter = (status: StatusType) =>{
        setStatus(status);
        setFileUploadingStatus(status);
    }
    //file preview handlers
    const generatePreviewImages = (files: File[]) => {
        const imagesElements: JSX.Element[] = [];
        files.forEach((file, index) => {
            if(!file) return;
            const imageUrl = URL.createObjectURL(file);
            const imgElement: JSX.Element = 
                <ImagePreview
                    imageSrc={imageUrl}
                    altText={file.name}
                    onRemove={() => removeFile(index)}
                />
                            
            imagesElements.push(imgElement);
        });
        return imagesElements;
    }
    return (
        <div  {...getRootProps()} className={style['drop-files-box'] + " " + customeClassName}>
            <input
     
            {...getInputProps()}
            />
            <label
            htmlFor="image-upload"
            className={`cursor-pointer flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
            >
                Select from computer
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
                    {generatePreviewImages(uploadingFiles)}
                </div>
            </div>
            )}
        </div>
    );
};

export default DropFilesBox;