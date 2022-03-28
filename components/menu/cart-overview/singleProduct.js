
import s from '../Menu.module.scss';
import { ImageUtils } from '../../../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';

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
                    <div className={s['single-product-options']}>
                        <div className={s['single-product-option']}>
                            <div className={s['option-title']}>Size:</div>
                            <div className={s['option-value']}>{product.size}</div>
                        </div>                        
                    </div>                    
                </div>
                <div className={s['single-product-remove']}>
                    <Tooltip title="Delete item" placement='right' arrow>
                        <div className={s['remove-button']}>
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </Tooltip>                    
                    <div className={s['price']}>${product.price}</div>
                </div>
            </div>
        </>
    );
}