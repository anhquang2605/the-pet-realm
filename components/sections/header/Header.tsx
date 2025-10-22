import React from 'react';
import style from './header.module.css';
import NavigationBar from '../../navigations/navigation-bar/navigation-bar';
import HomeIcon from './home-icon/home-icon';
import { IoMenu } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import SearchBar from '../../universals/search-bar/search-bar';
interface HeaderProps {
    isAuthenticated?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    isAuthenticated = false
}) => {
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
                
                <span className={style['mobile-top-group']}>
                    <HomeIcon />
                     <button className={style['exit-menu-button']} onClick={handleMobileMenuClick}>
                        <IoCloseCircle size={48} />
                    </button>
                    
                </span>
                <SearchBar />
                <NavigationBar role={isAuthenticated ? 'admin' : 'user'} />
            </header>
        </>

    );
};

export default Header;