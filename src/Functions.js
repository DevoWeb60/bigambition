export function toMillion(number, normale = true) {
    if (normale) {
        return number * 1000000;
    } else {
        return number / 1000000;
    }
}

export function frNumber(number) {
    return new Intl.NumberFormat("fr-FR").format(number);
}

export function confirmToDelete(message, callback) {
    const confirmed = window.confirm(message);
    if (confirmed) {
        callback();
    }
}
