const amountGrouper = (currencySymbol) => {
  ////    RETURNS CLASS THAT FOMATS LONG NUMBERS INTO READABLE CURRENCY VALUES

  const currency = String(currencySymbol).toUpperCase();

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    notation: 'standard',
  });
};

export default amountGrouper;
