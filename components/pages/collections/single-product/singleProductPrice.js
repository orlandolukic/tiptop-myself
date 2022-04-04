import { useCurrencyContext } from "hooks/useCurrency";
import { ClassManager, ImageUtils } from "lib/utils";
import { FormatNumber } from "lib/number";
import { useEffect, useState } from "react";
import { LoaderRing } from "components/loader/loaderRing";


export function SingleProductPrice({ price, s }) {

    const currencyContext = useCurrencyContext();
    const [ priceAmount, setPriceAmount ] = useState(0);    

    useEffect(() => {
        if ( currencyContext.getCurrency() === "USD" || currencyContext.getCurrency() === "EUR" ) {
            setPriceAmount( price[currencyContext.getCurrency()] );
        } else {
            setPriceAmount( price.USD / currencyContext.getRate() );
        }
    }, [currencyContext.getCurrency(), currencyContext.getRate()]);

    if ( currencyContext.isFetching() ) {
        return (
            <>
                <div className={s['fetching-rate']}>
                    <div style={{marginLeft: "-10px"}}>
                        <LoaderRing color="secondary" variation={'small'} />
                    </div>                
                    <div className="font-s-14 color-text-secondary" style={{marginTop: "5px"}}>Loading price...</div>
                </div>                
            </>
        );
    }

    let currencyPrint = "";
    switch ( currencyContext.getCurrency() ) {
    case "USD":
        currencyPrint = "$" + FormatNumber(priceAmount/100, 2);
        break;
    case "EUR":
        currencyPrint = "€" + FormatNumber(priceAmount/100, 2);
        break;
    case "ADA":
        currencyPrint = <>
            <div className={s['currency-logo']}>
                <img src={ImageUtils.getImageRoot() + "/cardano.webp"} />
            </div>
            {FormatNumber(priceAmount / 100, 6)} ADA
        </>;
        break;
    case "UST":
        currencyPrint = <>
            <div className={s['currency-logo']}>
                <img src={ImageUtils.getImageRoot() + "/ust.png"} />
            </div>
            {FormatNumber(priceAmount / 100, 2)} UST
        </>;
        break;

    case "ETH":
        currencyPrint = <>         
            <div className={s['currency-logo']} style={{marginRight: "10px"}}>
                <img src={ImageUtils.getImageRoot() + "/eth.png"} style={{width: "15px"}} />
            </div>
            <div>{FormatNumber(priceAmount / 100, 8)} ETH</div>            
        </>;
        break;
    }


    return (
        <>
            <div className={ClassManager().addClassWithRoot(s, 'currency-print').addClassWithRoot(s, 'show').getClassName()}>
                {currencyPrint}
            </div>            
        </>
    );
}