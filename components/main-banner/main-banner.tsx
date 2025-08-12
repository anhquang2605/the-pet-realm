import React from 'react';
import styles from './main-banner.module.css';
import Image from 'next/image';
import InvitationBtns from './invitation-btns/invitation-btns';
import BannerTitle from './banner-title/banner-title';
interface MainBannerProps {
    imageUrl?: string; // Optional image URL for the banner
    title?: string; // Optional title for the banner
}
export interface Action{
    title: string;
    href: string;
    color: string
}
const ACTIONS = [
    {
        title: 'Browse Shop',
        href: '/browse',
        color: 'chocolate'
    },
    {
        title: 'Join Discord',
        href: 'https://discord.gg/your-discord-link',
        color: '#5865F2'
    }
]
const MainBanner: React.FC<MainBannerProps> = ({}) => {
    return (
        <section className={styles['main-banner']}>
            <div className={styles['banner-overlay']}></div>
            <BannerTitle title={"Welcome to The Pet Realm"} />
            <InvitationBtns 
                actions={ACTIONS}
            />
            
        </section>
    );
};

export default MainBanner;