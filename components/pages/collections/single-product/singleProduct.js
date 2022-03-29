
import s from './singleProduct.module.scss';

export function SingleProduct({ product, columns, ...rest }) {
    const { image } = product;
    const { xs, sm, md, lg } = columns;

    return (
        <>
            <div className={'col-' + (12/xs) + " col-sm-" + (12/sm) + " col-md-" + (12/md) + " col-lg-" + (12/lg) }>
                <div className={s['single-product-placeholder']}>
                    <div className={s['single-product-image']}>
                        <img src={image} />
                    </div>
                </div>
            </div>
        </>
    )
}