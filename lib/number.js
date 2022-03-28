

export function FormatNumber(number, decimals = 2) {
    if ( typeof number !== typeof 0 ) 
        return "0,00";
    return number.toLocaleString( undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals } );
}