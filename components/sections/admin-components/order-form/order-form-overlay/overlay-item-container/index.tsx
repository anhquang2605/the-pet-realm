import React, {useState, useEffect} from 'react';
import style from './overlay-item-container.module.css';

type OverlayItemContainerProps = {
    item: React.ReactNode | string;
    isVisible?: boolean;
}

const OverlayItemContainer: React.FC<OverlayItemContainerProps> = ({item = '', isVisible}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['overlay-item-container'] + (isVisible ? ` ${style['visible']}` : '')}>
            {item}
        </div>
    );
};

export default OverlayItemContainer;