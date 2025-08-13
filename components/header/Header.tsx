import React from 'react';
import style from './header.module.css';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <div className={style['header']}>
            Header
        </div>
    );
};

export default Header;