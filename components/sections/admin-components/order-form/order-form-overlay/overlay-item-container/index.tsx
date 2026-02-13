import React, {useState, useEffect} from 'react';
import style from './overlay-item-container.module.css';

type OverlayItemContainerProps = {
    item: React.ReactNode | string;

}

const OverlayItemContainer: React.FC<OverlayItemContainerProps> = ({item}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['overlay-item-container']}>
            {item}
        </div>
    );
};

export default OverlayItemContainer;