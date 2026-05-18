import React, {useState, useEffect} from 'react';
import style from './order-images.module.css';
import { useOrderContext } from '../useOrderContext';
import ImageSlides from './image-slides';


type OrderImagesProps = Record<string, never>;

const OrderImages: React.FC<OrderImagesProps> = ({}) => {
    const { order } = useOrderContext();
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    useEffect(() => {
            if (order && order.imageUrls.length > 0) {
                setCurrentImage(order.imageUrls[0]);
            }
    }, []);

    return (
        order && 
        <section className={style['order-images']}>
            {order.imageUrls.length > 1 && (
                <ImageSlides setCurrentImage={setCurrentImage} images={order.imageUrls} />
            )}
            <img className={style['order-image']} src={currentImage || order.imageUrls[0]} alt={order.name} />
              
        </section>
    );
};

export default OrderImages;