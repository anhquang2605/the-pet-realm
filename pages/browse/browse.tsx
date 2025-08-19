import React from 'react';
import style from './.module.css';

interface BrowseProps {

}
export async function getStaticProps() {
    
}
const Browse: React.FC<BrowseProps> = ({}) => {
    return (
        <div className={style['']}>
            Browse
        </div>
    );
};

export default Browse;