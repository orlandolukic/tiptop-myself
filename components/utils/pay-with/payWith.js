import s from './payWith.module.scss';

export function PayWith() {

    return (
        <div className={s['pay-with-container']}>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='offset-2 col-8 font-s-16 d-flex align-items-center'>
                        <span className='text-uppercase color-text-primary fw-bold'>Pay with</span>
                        <span className={s['payment-group']}>Lagacy Finance</span>                        
                        <span className={s['or-sign']}>OR</span>
                        <span className={s['payment-group']}>Crypto</span>                        
                    </div>
                </div>
                <div className='row'>
                    <div className='offset-2 col-8 font-s-20 d-flex'>
                        <div>We provide different payment methods & solutions</div>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='offset-2 col-8 d-flex'>
                        <div className={s['pay-with-typeholder']}>
                            <div className={s['institution']}>
                                <img src="assets/images/cards.png" />
                            </div>
                            <div className={s['institution']}>
                                <img src="assets/images/stripe.png" />
                            </div>
                            <div className={s['institution']}>
                                <img src="assets/images/paypal.png" />
                            </div>                            
                            <div className={s['institution']}>
                                <img src="assets/images/nami-wallet.png" />
                            </div>
                            <div className={s['institution']}>
                                <img src="assets/images/metamask1.png" />
                            </div>
                            <div className={s['institution']}>
                                <img src="assets/images/terra.png" />
                            </div>
                        </div>
                    </div>            
                </div>            
            </div>
        </div>    
    );
}