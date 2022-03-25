
import s from '../Menu.module.scss';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { ProductContext } from '../../../hooks/useProduct';
import { SingleProduct } from './singleProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { EmptyCart } from './emptyCart';

export function CartOverview() {

    const productContext = useContext(ProductContext);

    const onClick = () => {       

        const resolveAfter3Sec = new Promise((resolve, reject) => setTimeout(reject, 3000));
        toast.promise(
            resolveAfter3Sec,
            {
            pending: 'Promise is pending',
            success: 'Promise resolved 👌',
            error: 'Promise rejected 🤯'            
            }
        );
        
    };

    let toPrint;
    if ( productContext.cart.getNumberOfProducts() > 0 ) {
        toPrint = (
            <>
                <div className={s['title']}>Shopping Cart</div>
                <div className={s['cart-overview-products']}>
                    {productContext.cart.getProducts().map((product, index) => (
                        <SingleProduct key={'i' + index} product={product}></SingleProduct>
                    ))}
                </div>
                <div className={s['cart-overview-total']}>
                    TOTAL
                </div>
            </>            
        );
    } else {
        toPrint = (
            <EmptyCart style={s} />
        );
    }
    
    return (
        <>                          
            <div className={s['cart-overview-placeholder']}>                
                {toPrint}               
            </div>                        
        </>
    );
}