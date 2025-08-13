import React from 'react';
import style from './home-icon.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
interface HomeIconProps {

}

const HomeIcon: React.FC<HomeIconProps> = ({}) => {
    const router = useRouter();
    const handleOnClick = () => {
        router.push('/');
    }
    return (
        <div className={style['home-icon']} >
            <Image
                src="/asset/icon/icon.png"
                alt="Home Icon"
                width={36}
                height={36}
            />
            <span className={style['home-icon-title']}>The Pet Realm</span>
        </div>
    );
};

export default HomeIcon;