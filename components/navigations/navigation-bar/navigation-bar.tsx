import React from 'react';
import style from './navigation-bar.module.css';

interface NavigationBarProps {

}
interface NavigationItem {
    title: string;
    href: string;
}
const NAVIGATION_ITEMS = [
    { title: 'Home', href: '/' },
    { title: 'Browse Shop', href: '/blog' },
    { title: 'Contact', href: '/contact' },

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