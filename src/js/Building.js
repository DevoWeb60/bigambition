export default class Building {
    constructor(estimated, bought, sale, buyAt, sellAt) {
        this.id = Math.round(
            Date.now() * Math.random() * (Math.random() * 156165) +
                Math.random()
        );
        this.estimated = estimated;
        this.bought = bought;
        this.sale = sale;
        this.buyAt = buyAt;
        this.sellAt = sellAt;
        this.difference = 0;
    }
}
