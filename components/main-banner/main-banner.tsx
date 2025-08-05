import React from 'react';
import styles from './main-banner.module.css';
import Image from 'next/image';
import InvitationBtns from './invitation-btns/invitation-btns';
interface MainBannerProps {
    imageUrl?: string; // Optional image URL for the banner
    title?: string; // Optional title for the banner
}
export interface Action{
    title: string;
    href: string;
}
const ACTIONS = [
    {
        title: 'Browse Shop',
        href: '/browse'
    },
    {
        title: 'Join Discord',
        href: 'https://discord.gg/your-discord-link'
    }
]
const MainBanner: React.FC<MainBannerProps> = ({}) => {
    return (
        <div className={styles['main-banner']}>
            <Image
                src="/asset/images/banner.png"
                alt="Main Banner"
                width={1920}
                height={1080}
                layout="responsive"
                className="cover h-1/2"
            />   
            <InvitationBtns 
                actions={ACTIONS}
            />
        </div>
    );
};

export default MainBanner;