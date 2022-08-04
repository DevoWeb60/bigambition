export default class DOM {
    constructor(data) {
        this.data = data;
        console.log(this.data);
    }

    formatNumbers() {
        const numberFormat = (number) => {
            return new Intl.NumberFormat("fr-FR").format(number);
        };
        this.data.budget = numberFormat(this.data.budget);
        this.data.earn = numberFormat(this.data.earn);
        this.data.payday = numberFormat(this.data.payday);
        this.data.totalBought = numberFormat(this.data.totalBought);
        this.data.newBudget = numberFormat(this.data.newBudget);

        this.data.dataObject.forEach((estate) => {
            estate.bought = numberFormat(estate.bought);
            estate.estimated = numberFormat(estate.estimated);
            estate.difference = numberFormat(estate.difference);
            estate.sale = numberFormat(estate.sale);
        });
    }

    createSection() {
        let section = document.createElement("section");
        section.innerHTML = `
            <div class="section-header">
                <h2>Jour ${this.data.start} &#8594; Jour ${this.data.end}</h2>
                <h3><span>Budget :</span> ${this.data.budget} $</h3>
            </div>
            `;
        return section;
    }

    createBuilding(estate) {
        const building = document.createElement("li");
        building.className = "building";
        building.innerHTML = `
            <div class="estimated">${estate.estimated} $ </div>
            <div class="bought">${estate.bought} $ </div>
            <div class="sale">${estate.sale} $ </div>
            <div class="buyAt">${estate.buyAt} &#8594; ${estate.sellAt}</div>
            <div class="difference">${estate.difference} $ </div>
            <div class="differenceDay">${
                estate.sellAt - estate.buyAt
            } jour(s)</div>
        `;

        return building;
    }

    createList() {
        const list = document.createElement("ul");
        list.classList.add("list");
        list.innerHTML = `
            <li class="head">
                <div class="estimated">Valeur estimé</div>
                <div class="bought">Acheté</div>
                <div class="sale">Vendu</div>
                <div class="buyAt">Achat &#8594; Vente</div>
                <div class="difference">Bénéfice</div>
                <div class="differenceDay">Vendu en</div>
            </li>
        `;
        this.data.dataObject.forEach((estate) => {
            const building = this.createBuilding(estate);
            list.appendChild(building);
        });

        return list;
    }

    createFooter() {
        const footer = document.createElement("div");
        footer.classList.add("footer");
        footer.innerHTML = `
            <p>
                <hr>
                Achat de ${this.data.buildingBought} bâtiment(s) pour ${
            this.data.totalBought
        } $
                <hr>
                Bénéfice total : <strong> ${this.data.earn} $ </strong> pour ${
            this.data.end - this.data.start
        } jour(s)
                <hr>
                Le bénéfice est de <strong> ${
                    this.data.pourcentage
                }% </strong> du total investi
                <hr>
                Moyenne par jour : <strong> ${this.data.payday} $/jour </strong>
                <hr>
                Nouveau budget : <strong>~ ${this.data.newBudget} $ </strong>
                <hr>
            </p>
        `;

        return footer;
    }

    init() {
        this.formatNumbers();
        const section = this.createSection();
        const list = this.createList();
        const footer = this.createFooter();
        section.appendChild(list);
        section.appendChild(footer);
        document.body.appendChild(section);
    }
}
