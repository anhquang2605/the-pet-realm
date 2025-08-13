import React from 'react';
import style from './header.module.css';
import NavigationBar from '../../navigations/navigation-bar/navigation-bar';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <header className={style['header']}>
            <NavigationBar />
        </header>
    );
};

export default Header;