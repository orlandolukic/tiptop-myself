import { ClassManager } from 'lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import s from './breadcrumbs.module.scss';

export function Breadcrumbs({ path }) {

    if ( typeof path === typeof undefined )
        return <></>;

    path = [
        {name: "Home", url: "/", canNavigate: true},
        ...path
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className={s['breadcrumb-container']}>
                        <div className={s['list']}>
                            {path.map((value, index) => (
                                <Fragment key={'fragment-' + index}>
                                    {index > 0 &&
                                    <div className={s['separator']}>/</div>
                                    }
                                    <div className={ClassManager().addClass(s['list-item']).addClass(index === path.length - 1 ? s["selected"] : null).getClassName()}>
                                        {value.canNavigate && index < path.length - 1 &&
                                        <Link href={value.url}>
                                            <a>{value.name}</a>                                            
                                        </Link>                                        
                                        }                                        
                                        {(!value.canNavigate || index === path.length - 1) && value.name}
                                    </div>
                                </Fragment>                                                            
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}