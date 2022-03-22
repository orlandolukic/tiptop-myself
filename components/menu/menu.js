import style from './Menu.module.scss';
import Link from 'next/link';
import { getUserContext, UserContext } from '../../hooks/useUser';
import { useContext, useEffect, useState } from 'react';

function X() {
    const context = useContext(UserContext);

    useEffect(() => {
        //context.operations.login();
    })

    const onClick = () => {
        context.operations.login();
    }

    return (   
        <div onClick={onClick}>{context.data.username}</div>              
    );
}

export function Menu() { 

    return (
        <div className={style['menu-placeholder']}>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <Link href="/">
                            <a>
                                <div className={style['logo-placeholder']}>
                                    <div className={style['logo']}>
                                        <img src='assets/images/logo.svg' />
                                    </div>
                                    <div className={style['name']}>tiptop</div>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className='col-6 d-flex justify-content-end'>                        
                        <X></X>                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export const MenuStyle = style;