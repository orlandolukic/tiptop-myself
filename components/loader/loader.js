import { useEffect, useState } from 'react';
import s from './loader.module.scss';
import { LoaderRing } from './loaderRing';

export function Loader(props) {

    if ( !props.isLoading )
        return <></>;
 
    return (
        <>
            <div className={s['loader-placeholder']}>
                <div className={s['background-cover']}></div>
                <div className={s['content-placeholder']}>
                    <div className={s['content']}>                        
                        <LoaderRing />
                    </div>
                </div>
            </div>
        </>
    );
}