import React from 'react';
import style from './main-banner.module.css';
import Image from 'next/image';
interface MainBannerProps {
    imageUrl?: string; // Optional image URL for the banner
    title?: string; // Optional title for the banner
}

const MainBanner: React.FC<MainBannerProps> = ({}) => {
    return (
        <div className={style['main-banner']}>
            <Image
                src="/images/banner.jpg"
                alt="Main Banner"
                width={1920}
                height={600}
            />   
        </div>
    );
};

export default MainBanner;