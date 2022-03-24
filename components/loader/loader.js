import { useEffect, useState } from 'react';
import s from './loader.module.scss';

export function Loader(props) {

    if ( !props.isLoading )
        return <></>;
 
    return (
        <>
            <div className={s['loader-placeholder']}>
                <div className={s['background-cover']}></div>
                <div className={s['content-placeholder']}>
                    <div className={s['content']}>                        
                        <div className={s['lds-ring']}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}