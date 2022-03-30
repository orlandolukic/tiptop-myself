import { useEffect, useState } from 'react';
import s from './loader.module.scss';
import { LoaderRing } from './loaderRing';

export function Loader({ isLoading, styleContainer, positionLoader, ...rest }) {

    if ( !isLoading )
        return <></>;

    const styleContainerInside = {
        position: typeof styleContainer === typeof undefined || styleContainer === null || typeof styleContainer.position === typeof undefined ? "fixed" : styleContainer.position,
        minHeight: typeof styleContainer === typeof undefined || styleContainer === null || typeof styleContainer.minHeight === typeof undefined ? "auto" : styleContainer.minHeight
    };

    const styleContent = {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: typeof positionLoader !== typeof undefined ? typeof positionLoader.top !== typeof undefined ? positionLoader.top : "auto" : "auto",
        marginBottom: typeof positionLoader !== typeof undefined ? typeof positionLoader.bottom !== typeof undefined ? positionLoader.bottom : "auto" : "auto",
    }
 
    return (
        <>
            <div className={s['loader-placeholder']} style={styleContainerInside}>
                <div className={s['background-cover']}></div>
                <div className={s['content-placeholder']}>
                    <div className={s['content']} style={styleContent}>                        
                        <LoaderRing {...rest} />
                    </div>
                </div>
            </div>
        </>
    );
}