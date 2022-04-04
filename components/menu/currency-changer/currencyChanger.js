import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem, Select } from '@mui/material';
import { useCurrencyContext } from 'hooks/useCurrency';
import { ClassManager } from 'lib/utils';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import s from './currency-changer.module.scss';

export function CurrencyChanger({ showCurrency }) {

    const currencyContext = useCurrencyContext();
    const { getCurrency, getSupportedCurrencies, changeCurrency } = useCurrencyContext();
    const [ showCurrencyList, setShowCurrencyList ] = useState(false);
    const onOpenCurrency = useCallback((e) => {        
        setShowCurrencyList( !showCurrencyList );
        e.stopPropagation();
    });    
    const documentClickHandler = useCallback((e) => {        
        //if ( e.target !== currencyChosenRef.current )
        setShowCurrencyList(false);
    });
    const documentKeyupHandler = useCallback((e) => {        
        if ( e.keyCode === 27 )
            setShowCurrencyList(false);
    });
    const chooseCurrency = useCallback((currency, e) => {
        changeCurrency.call(currencyContext, currency);
    });
    const currencyChosenRef = useRef();

    const shownClass = showCurrencyList ? "shown" : null;
    
    const icon = showCurrencyList ? faChevronUp : faChevronDown;

    useEffect(() => {
        window.addEventListener("click", documentClickHandler);
        window.addEventListener("keyup", documentKeyupHandler);
        return () => {
            console.log("destroy currency changer");
            window.removeEventListener("click", documentClickHandler);
            window.removeEventListener("keyup", documentKeyupHandler);
        };
    }, []);

    if ( !showCurrency )
        return <></>;

    return (
        <>
            <div className={s['currency-chooser']}>
                <div className={s['title']}>
                    Choose Currency
                </div>
                <div className={ClassManager(s['currency-chooser-placeholder']).addClassWithRoot(s, shownClass).getClassName()}>
                    <div ref={currencyChosenRef} className={s['currency-chosen']} onClick={onOpenCurrency}>
                        <span className={s['currency']}>{ getCurrency() }</span>                        
                        <span className={s['icon']}><FontAwesomeIcon icon={icon} size="xs" /></span>                        
                    </div>
                    <div className={s['currency-list']}>
                        { getSupportedCurrencies().map((currency, i) => (                      
                            <div key={'currency-' + i} className={s['currency-entry']} onClick={chooseCurrency.bind(null, currency)}>
                                <span className='fw-bold'>{currency.ticker}</span> - {currency.name}
                            </div>                       
                        )) }
                    </div>
                </div>
            </div>
        </>
    );
}