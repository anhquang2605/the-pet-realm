import React from 'react';
import style from './navigation-bar.module.css';
import { BsHouse } from 'react-icons/bs';

interface NavigationBarProps {

}
interface NavigationItem {
    title: string;
    href: string;
    icon: React.ReactNode;
}
const NAVIGATION_ITEMS = [
    { title: 'Home', href: '/', icon: <BsHouse/> },
    { title: 'Browse Shop', href: '/browse', icon: null },
    { title: 'Contact', href: '/contact', icon: null },

]

const NavigationBar: React.FC<NavigationBarProps> = ({}) => {
    const handleOnClick = (href: string) => {
        const $window  = window as any;
        if($window){
            $window.location.href = href;
        }
    }
    return (
        <nav className={`${style['navigation-bar']}`} >
            <ul className={style['navigation-list']}>
                {NAVIGATION_ITEMS.map((item: NavigationItem, index: number) => (
                    <li key={index} className={style['navigation-item']} onClick={() => handleOnClick(item.href)}>
                        {item.title}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationBar;