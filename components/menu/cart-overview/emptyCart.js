

export function EmptyCart({style}) {
    
    return (
        <div className={style['empty-cart']}>
            <div className={'font-s-70'}>
                👇             
            </div>
            <div className={['mt-1', style['title']].join(' ')}>
                <div className='font-s-30 text-center'>Ouuuuuups...</div>                            
            </div>                        
            <div className='text-center'>
                Your shopping cart is empty
            </div>
        </div>
    );
}