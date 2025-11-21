import React from 'react';
import style from './image-preview.module.css';

interface ImagePreviewProps {
    onRemove?: () => void;
    imageSrc?: string;
    altText?: string;
    classNames?: string;
    id?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
    onRemove = () => {},
    imageSrc = '',
    altText = 'Image Preview',
    classNames = '',
    id = '',
}) => {
    return (
        <div className={style['image-preview'] + " " + classNames}>
            <img src={imageSrc} alt={altText} id={id} className={style['image-preview__img']} />
            <button className={style['image-preview__remove-button']} onClick={onRemove}>
                &times;
            </button>
        </div>
    );
};

export default ImagePreview;