export default class Building {
    constructor(estimated, bought, sale, buyAt, sellAt) {
        this.estimated = estimated;
        this.bought = bought;
        this.sale = sale;
        this.buyAt = buyAt;
        this.sellAt = sellAt;
        this.difference = 0;
    }
}
