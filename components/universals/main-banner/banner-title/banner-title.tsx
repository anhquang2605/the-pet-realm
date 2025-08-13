import React from 'react';
import style from './banner-title.module.css';

interface BannerTitleProps {
    title: string;
}

const BannerTitle: React.FC<BannerTitleProps> = ({title}) => {
    return (
        <h1 className={style['banner-title']}>
            {
                title
            }
        </h1>
    );
};

export default BannerTitle;