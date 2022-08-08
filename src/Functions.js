export function toMillion(number, normale = true) {
    if (normale) {
        return Number(number * 1000000);
    } else {
        return Number(number / 1000000);
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

export function getDifference(selling, buying) {
    return Number(selling) - Number(buying);
}

export function getPourcentage(minus, max) {
    return Number(parseFloat((minus * 100) / max).toFixed(2));
}

export function getTotal(array, key) {
    return array.reduce((acc, estate) => {
        return acc + estate[key];
    }, 0);
}

export function getTotalEarn(array) {
    return array.reduce((acc, estate) => {
        return acc + estate.sale - estate.bought;
    }, 0);
}

export function getPayday(selling, start, end) {
    return Math.round(selling / (end - start));
}

export function getMiddleEarnPourcentage(estates) {
    let totalPourcent = 0;
    estates.forEach((estate) => {
        totalPourcent += getPourcentage(
            getDifference(estate.sale, estate.bought),
            estate.estimated
        );
    });
    return parseFloat(totalPourcent / estates.length).toFixed(2);
}

export function getAverage(array, key) {
    return Math.round(
        array.reduce((acc, estate) => {
            return acc + estate[key];
        }, 0) / array.length
    );
}
