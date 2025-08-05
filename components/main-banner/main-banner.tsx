import React from 'react';
import styles from './main-banner.module.css';
import Image from 'next/image';
interface MainBannerProps {
    imageUrl?: string; // Optional image URL for the banner
    title?: string; // Optional title for the banner
}

const MainBanner: React.FC<MainBannerProps> = ({}) => {
    return (
        <div className={styles['main-banner']}>
            <Image
                src="/asset/images/banner.png"
                alt="Main Banner"
                width={1920}
                height={1080}
                layout="responsive"
            />   
        </div>
    );
};

export default MainBanner;