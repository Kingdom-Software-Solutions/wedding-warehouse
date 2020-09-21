export const calculateTotal = (items) => {
        // formats currency string for total
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        // dynamically set the total
        let add = 0.00;
        items.forEach(item => add += item.rentalRate);
        return formatter.format(add);
}