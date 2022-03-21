import style from './Menu.module.scss';

export function Menu() {    
    return (
        <div className={style['menu-placeholder']}>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <div className={style['logo-placeholder']}>
                            <div className={style['logo']}>
                                <img src='assets/images/logo.svg' />
                            </div>
                            <div className={style['name']}>tiptop</div>
                        </div>
                    </div>
                    <div className='col-6 d-flex justify-content-end'>sdfsdf</div>
                </div>
            </div>
        </div>
    );
}

export const MenuStyle = style;