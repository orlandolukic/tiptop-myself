
import s from '../Menu.module.scss';
import { ImageUtils } from '../../../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import { FormatNumber } from 'lib/number';
import { Button, ButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { ProductContext } from 'hooks/useProduct';

export function SingleProduct({ product, loading, ...rest }) {

    let { cart } = useContext(ProductContext);
    const { setIsLoading, hide } = loading;

    const increaseQuantity = async () => {
        setIsLoading(true);
        await cart.setQuantityForProduct(product, product.quantity+1);
        setIsLoading(false);    
    };

    const decreaseQuantity = async () => {
        if ( product.quantity === 1 ) 
            return;
        setIsLoading(true);
        await cart.setQuantityForProduct(product, product.quantity-1);
        setIsLoading(false);
    };

    const deleteItem = async () => {
        setIsLoading(true);        
        await cart.deleteItem(product);        
        if ( cart.getNumberOfProducts() === 1 )
            hide();
        setIsLoading(false);            
    }

    return (
        <>            
            <div className={s['single-product-placeholder']}>                
                <div className={s['single-product-image']}>
                    <img src={product.image} />
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
                    <div className={s['single-product-quantity']}>

                        <div className='button-group color-primary'>
                            <div className='button' onClick={decreaseQuantity}>-</div>
                            <input type="text" value={product.quantity} disabled="disabled" />
                            <div className='button' onClick={increaseQuantity}>+</div>
                        </div>
                    </div>                  
                </div>
                <div className={s['single-product-remove']}>
                    <Tooltip title="Delete item" placement='right' arrow>
                        <div className={s['remove-button']} onClick={deleteItem}>
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </Tooltip>                    
                    <div className={s['price']}>${FormatNumber(product.quantity * product.price)}</div>
                </div>                
            </div>
        </>
    );
}