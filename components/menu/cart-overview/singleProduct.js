
import s from '../Menu.module.scss';
import { ImageUtils } from '../../../lib/utils';

export function SingleProduct({ product }) {

    return (
        <>            
            <div className={s['single-product-placeholder']}>                
                <div className={s['single-product-image']}>
                    <img src={ImageUtils.getProductImageRoot() + "/" + product.image} />
                </div>
                <div className={s['single-product-details']}>
                    <div className={s['single-product-name']}>{product.name}</div>
                    <div className={s['single-product-category']}>{product.category}</div>
                    <div className={s['single-product-quantity']}>{product.quantity}</div>
                </div>
            </div>
        </>
    );
}