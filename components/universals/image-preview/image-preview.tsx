import React from 'react';
import style from './image-preview.module.css';

interface ImagePreviewProps {
    onRemove?: () => void;
    imageSrc?: string;
    altText?: string;
    classNames?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
    onRemove = () => {},
    imageSrc = '',
    altText = 'Image Preview',
    classNames = '',
}) => {
    return (
        <div className={style['image-preview'] + " " + classNames}>
            ImagePreview
        </div>
    );
};

export default ImagePreview;