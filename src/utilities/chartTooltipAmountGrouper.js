const chartTooltipAmountGrouper = (currencySymbol) => {

    ////    RETURNS CLASS THAT FOMATS LONG NUMBERS INTO READABLE CURRENCY VALUES WITH DECIMAL NUMBERS FOR CLEARER/PRECISE INSIGHT

    const currency = String(currencySymbol).toUpperCase()

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        notation: 'standard',
        minimumFractionDigits: 4
    })
}

export default chartTooltipAmountGrouper