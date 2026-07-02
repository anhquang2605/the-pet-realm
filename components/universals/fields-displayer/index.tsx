import React, {useState, useEffect} from 'react';
import style from './fields-displayer.module.css';
import { camelToCapitalized } from '../../../libs/helpers';

//generic component to display fields and their values in a structured manner
type FieldsDisplayerProps<T> = {
    items: Partial<T>[];
    sectionTitle?: string;
    imageUrl?: string; // Optional image URL to display at the top of the section
};

const FieldsDisplayer= <T,>({ items , sectionTitle = "", imageUrl}: FieldsDisplayerProps<T>) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['fields-displayer']}>
            <h3 className={style['section-title']}>{sectionTitle}</h3>
            {imageUrl && <img src={imageUrl} alt="Section Image" className={style['section-image']} />}
            {items.map((item, index) => (
                <div key={index} className={style['field-item']}>

                    {Object.entries(item).map(([key, value]) => (
                        <div key={key} className={style['field']}>    
                            <div className={style['field-label']}> {camelToCapitalized(key)}:</div>
                            <div className={style['field-value']}> {value as string}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FieldsDisplayer;