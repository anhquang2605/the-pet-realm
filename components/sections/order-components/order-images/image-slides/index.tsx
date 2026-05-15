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
            {
                images.map((image, index) =>  (
                    <img key={index} className={style['image-slides__image']} src={image} alt={`Slide ${index + 1}`} />
                ))  
                

            }
        </div>
    );
};

export default ImageSlides;