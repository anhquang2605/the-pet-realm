import React from 'react';
import style from './page-styles/browse.module.css';

interface BrowseProps {

}
export async function getStaticProps() {
    const props: BrowseProps = {};
    return { props,
    };
}
const Browse: React.FC<BrowseProps> = ({}) => {
    return (
        <div className={style['']}>
            Browse
        </div>
    );
};

export default Browse;