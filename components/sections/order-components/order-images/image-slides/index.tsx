import React, {useState, useEffect} from 'react';
import style from './image-slides.module.css';

type ImageSlidesProps = {
    images: string[];
};

const ImageSlides: React.FC<ImageSlidesProps> = ({ images }) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['image-slides']}>
            ImageSlides
        </div>
    );
};

export default ImageSlides;