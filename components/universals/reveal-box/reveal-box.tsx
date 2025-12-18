import React from 'react';
import style from './reveal-box.module.css';

interface RevealBoxProps {
    children: React.ReactNode;
    hasCustomeRevealButton?: boolean;
    customRevealSetter?: (isRevealed: boolean) => void;
    buttonStateTitles:[string, string]; // [show, hide]
    closeButtonTitle?: string;
}

const RevealBox: React.FC<RevealBoxProps> = ({children , hasCustomeRevealButton = false, closeButtonTitle = "Close"} , buttonStateTitles = ["Reveal", "Hide"]) => {
    const [isRevealed, setIsRevealed] = React.useState(false);

    return (
        <>
        {
            hasCustomeRevealButton ?
            <button className={style['reveal-button']} onClick={() => setIsRevealed(!isRevealed)}>
                {isRevealed ? buttonStateTitles[1] : buttonStateTitles[0]}
            </button>
            : ''
        }   
            <div className={style['reveal-box'] + " " + (isRevealed ? style['active'] : '')}>  
                {
                    children
                }
                <button className={style['toggle-button']} onClick={() => setIsRevealed(!isRevealed)}>      
                    {closeButtonTitle}
                </button>
            </div>
        </>
    );
};

export default RevealBox;