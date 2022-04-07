import { useEffect, useState } from 'react';
import s from './loader.module.scss';
import { LoaderRing } from './loaderRing';

export function Loader({ isLoading, styleContainer, positionLoader, ...rest }) {

    if ( !isLoading )
        return <></>;

    const styleContainerInside = {
        position: typeof styleContainer === typeof undefined || styleContainer === null || typeof styleContainer.position === typeof undefined ? "fixed" : styleContainer.position,
        minHeight: typeof styleContainer === typeof undefined || styleContainer === null || typeof styleContainer.minHeight === typeof undefined ? "auto" : styleContainer.minHeight,
        top: typeof styleContainer === typeof undefined || styleContainer === null || typeof styleContainer.top === typeof undefined ? "auto" : styleContainer.top,
        right: typeof styleContainer === typeof undefined || styleContainer === null || typeof styleContainer.right === typeof undefined ? "auto" : styleContainer.right,
        bottom: typeof styleContainer === typeof undefined || styleContainer === null || typeof styleContainer.bottom === typeof undefined ? "auto" : styleContainer.bottom,
        left: typeof styleContainer === typeof undefined || styleContainer === null || typeof styleContainer.left === typeof undefined ? "auto" : styleContainer.left
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