import React from 'react';
import style from './navigation-bar.module.css';
import { BsCart, BsHouse, BsPersonVcard } from 'react-icons/bs';
import { TbChartInfographic } from "react-icons/tb";
import { LuPackageSearch, LuMail } from "react-icons/lu";
import ActionButton from '../../universals/buttons/action-button/action-button';
interface NavigationBarProps {
    role?: 'admin' | 'user';
}
interface NavigationItem {
    title: string;
    href: string;
    icon: React.ReactNode;
}
const NAVIGATION_ITEMS = [
    { title: 'Home', href: '/', icon: <BsHouse/> },
    { title: 'Shop', href: '/browse', icon: <BsCart/> },
    { title: 'Contact', href: '/contact', icon: <BsPersonVcard/> },

]

const ADMIN_NAVIGATION_ITEMS = [
    { title: 'Dashboard', href: '/admin', icon: <TbChartInfographic/> },
    /* { title: 'Search Orders', href: '/browse/admin', icon: <LuPackageSearch/> },
    { title: 'Mailbox', href: '/mailbox', icon: <LuMail/> }, */
    { title: 'Account', href: '/admin/account', icon: <BsPersonVcard/> },
]

const NavigationBar: React.FC<NavigationBarProps> = ({
    role = 'user'
}) => {
    const navigationItems = role === 'admin' ? ADMIN_NAVIGATION_ITEMS : NAVIGATION_ITEMS;
    const handleOnClick = (href: string) => {
        const $window  = window as any;
        if($window){
            $window.location.href = href;
        }
    }
    
    return (
        <nav className={`${style['navigation-bar']}`} >
            <ul className={style['navigation-list']}>
                {navigationItems.map((item: NavigationItem, index: number) => (
                    <li key={index} className={style['navigation-item']} onClick={() => handleOnClick(item.href)}>
                        <span className={style['navigation-item__icon']}>
                            {item.icon}
                        </span>
                         <span className={style['navigation-item__title']}>
                            {item.title}
                        </span>
                    </li>
                ))}
              
            </ul>
              {
                    role === 'admin' &&
                    <ActionButton title="Logout" onClick={() => handleOnClick('/authentication/logout')} color={'red'} type={'link'} />
                    
            }
        </nav>
    );
};

export default NavigationBar;