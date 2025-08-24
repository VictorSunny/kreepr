const dollarCurrencyShortener = () => {
  ////    RETURNS CLASS THAT FOMATS LONG NUMBERS INTO SHORTENED CURRENCY VALUES

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  });
};

export default dollarCurrencyShortener;
