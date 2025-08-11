import React from 'react';
import style from './navigation-bar.module.css';

interface NavigationBarProps {

}

const NavigationBar: React.FC<NavigationBarProps> = ({}) => {
    return (
        <div className={style['navigation-bar']}>
            NavigationBar
        </div>
    );
};

export default NavigationBar;