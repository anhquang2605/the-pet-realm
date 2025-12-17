import React from 'react';
import style from './reveal-box.module.css';

interface RevealBoxProps {
    children: React.ReactNode;
    hasCustomeRevealButton?: boolean;
    customRevealSetter?: (isRevealed: boolean) => void;
}

const RevealBox: React.FC<RevealBoxProps> = ({children , hasCustomeRevealButton = false}) => {
    const [isRevealed, setIsRevealed] = React.useState(false);
    
    return (
        <>

            <div className={style['reveal-box'] + " " + (isRevealed ? style['active'] : '')}>
                {
                    children
                }
            </div>
        </>
    );
};

export default RevealBox;