const MILLION = 1000000;

export default class Session {
    constructor(start, end, budget, dataObject) {
        this.start = start;
        this.end = end;
        this.budget = budget;
        this.dataObject = dataObject;
        this.buildingBought = this.dataObject.length;
        this.earn = 0;
        this.payday = 0;
        this.totalBought = 0;
        this.init();
    }

    convertToMillions() {
        this.budget = this.budget * MILLION;

        this.dataObject.forEach((estate) => {
            estate.bought = estate.bought * MILLION;
            estate.sale = estate.sale * MILLION;
            estate.estimated = estate.estimated * MILLION;
            estate.difference = estate.difference * MILLION;
        });
    }

    setTotalBought() {
        let total = 0;
        this.dataObject.forEach((estate) => {
            total += estate.bought;
        });
        this.totalBought = total;
    }

    setDifference() {
        this.dataObject.forEach((estate) => {
            estate.difference = estate.sale - estate.bought;
        });
    }

    setEarn() {
        this.dataObject.forEach((estate) => {
            this.earn += estate.difference;
        });
    }

    setPayday() {
        this.payday = Math.floor(this.earn / (this.end - this.start));
    }

    init() {
        this.convertToMillions();
        this.setTotalBought();
        this.setDifference();
        this.setEarn();
        this.setPayday();
    }
}
