export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

export const priceFormatter = (rate) => {  
    return formatter.format(rate);
}