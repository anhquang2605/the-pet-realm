import React from 'react';
import style from './header.module.css';
import NavigationBar from '../../navigations/navigation-bar/navigation-bar';
import HomeIcon from './home-icon/home-icon';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <header className={style['header'] + ' main-bg'}>
            <HomeIcon />
            <NavigationBar />
        </header>
    );
};

export default Header;