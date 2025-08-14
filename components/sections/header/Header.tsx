import React from 'react';
import style from './header.module.css';
import NavigationBar from '../../navigations/navigation-bar/navigation-bar';
import HomeIcon from './home-icon/home-icon';
import { IoMenu } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
interface HeaderProps {

}

const Header: React.FC<HeaderProps> = ({}) => {
    const handleMobileMenuClick = () => {
        const $header = document.querySelector(`.${style['header']}`);
        if ($header) {
            $header.classList.toggle(style['opened']);
        }
    }
    return (
        <>
            <button className={style['mobile-menu-button']} onClick={handleMobileMenuClick}>
                <IoMenu size={30} />
            </button>
            <header className={style['header'] + ' main-bg'}>
                <button className={style['exit-menu-button']} onClick={handleMobileMenuClick}>
                    <IoCloseCircle size={48} />
                </button>
                <HomeIcon />
                <NavigationBar />
            </header>
        </>

    );
};

export default Header;