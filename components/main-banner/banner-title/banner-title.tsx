import React from 'react';
import style from './banner-title.module.css';

interface BannerTitleProps {
    title: string;
}

const BannerTitle: React.FC<BannerTitleProps> = ({title}) => {
    return (
        <div className={style['banner-title']}>
            {
                title
            }
        </div>
    );
};

export default BannerTitle;