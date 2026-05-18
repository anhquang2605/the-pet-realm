import React, {useState, useEffect} from 'react';
import style from './image-slides.module.css';

type ImageSlidesProps = {
    images: string[];
    setCurrentImage?: (image: string) => void;
};

const ImageSlides: React.FC<ImageSlidesProps> = ({ images, setCurrentImage }) => {
    useEffect(() => {

    }, []);
    const handleImageClick = (image: string) => {
        setCurrentImage && setCurrentImage(image);
    }
    return (
        <div className={style['image-slides']}>
            {
                images.map((image, index) =>  (
                    <img key={index} className={style['image-slides__image']} src={image} alt={`Slide ${index + 1}`} onClick={() => handleImageClick(image)} />
                ))  
                

            }
        </div>
    );
};

export default ImageSlides;