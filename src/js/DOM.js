export default class DOM {
    constructor(data) {
        this.data = data;
        console.log(this.data);
    }

    formatNumbers() {
        this.data.budget = new Intl.NumberFormat("fr-FR").format(
            this.data.budget
        );
        this.data.earn = new Intl.NumberFormat("fr-FR").format(this.data.earn);
        this.data.payday = new Intl.NumberFormat("fr-FR").format(
            this.data.payday
        );
        this.data.totalBought = new Intl.NumberFormat("fr-FR").format(
            this.data.totalBought
        );

        this.data.dataObject.forEach((estate) => {
            estate.bought = new Intl.NumberFormat("fr-FR").format(
                estate.bought
            );
            estate.estimated = new Intl.NumberFormat("fr-FR").format(
                estate.estimated
            );
            estate.difference = new Intl.NumberFormat("fr-FR").format(
                estate.difference
            );
            estate.sale = new Intl.NumberFormat("fr-FR").format(estate.sale);
        });
    }

    createSection() {
        let section = document.createElement("section");
        section.innerHTML = `
            <div class="section-header">
                <h2>Jour ${this.data.start} > Jour ${this.data.end}</h2>
                <h3>${this.data.budget} $</h3>
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
            <div class="buyAt">${estate.buyAt}</div>
            <div class="sellAt">${estate.sellAt}</div>
            <div class="difference">${estate.difference} $ </div>
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
                <div class="buyAt">Acheter le</div>
                <div class="sellAt">Vendu le</div>
                <div class="difference">Bénéfice</div>
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
                Achat de ${this.data.buildingBought} bâtiment(s) pour ${
            this.data.totalBought
        } $
                <br>
                Bénéfice total : <strong> ${this.data.earn} $ </strong> pour ${
            this.data.end - this.data.start
        } jour(s)
                <br>
                Moyenne par jour : <strong> ${this.data.payday} $/jour </strong>
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
