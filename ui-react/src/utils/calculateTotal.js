import { formatter } from './priceFormatter';

export const calculateTotal = (items) => {
        // formats currency string for total
        const priceFormat = formatter
        // dynamically set the total
        let add = 0.00;
        items.forEach(item => add += item.rentalRate);
        return priceFormat.format(add);
}