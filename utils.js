
export const displayCurrency = (value, decimals) => Number(Math.round(value+'e'+decimals)+'e-'+decimals);