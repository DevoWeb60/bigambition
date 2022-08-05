export default class DOM {
    constructor(data = false) {
        this.data = data;
        this.totalEarnSinceStart = 0;
        this.totalPayday = 0;
        this.totalBought = 0;
        this.totalPourcentage = 0;
        this.totalBuildingBought = 0;
        this.startingBudget = 0;
        this.endingBudget = 0;
        if (this.data.length) {
            this.totalEarn(this.data);
            this.createNewSessionForm();
        } else {
            this.init();
        }
    }

    numberFormat(number) {
        return new Intl.NumberFormat("fr-FR").format(number);
    }
    formatNumbers() {
        this.totalBought = this.numberFormat(this.totalBought);
        this.totalEarnSinceStart = this.numberFormat(this.totalEarnSinceStart);
        this.totalPayday = this.numberFormat(this.totalPayday);

        this.data.budget = this.numberFormat(this.data.budget);
        this.data.earn = this.numberFormat(this.data.earn);
        this.data.payday = this.numberFormat(this.data.payday);
        this.data.totalBought = this.numberFormat(this.data.totalBought);
        this.data.newBudget = this.numberFormat(this.data.newBudget);

        this.data.dataObject.forEach((estate) => {
            estate.bought = this.numberFormat(estate.bought);
            estate.estimated = this.numberFormat(estate.estimated);
            estate.difference = this.numberFormat(estate.difference);
            estate.sale = this.numberFormat(estate.sale);
        });
    }

    createSection() {
        let section = document.createElement("section");
        section.innerHTML = `
        <div class="inactive">
            <div class="inactive-header">
                <h2>Jour ${this.data.start} &#8594; Jour ${this.data.end}</h2>
                <h3><span>Recette : </span>${this.data.earn} $</h3>
                <h3><span>Building Acheté : </span>${this.data.buildingBought}</h3>
                <button id="delete">Supprimer</button>
            </div>
        </div>
        <div class="section-header">
            <h2>Jour ${this.data.start} &#8594; Jour ${this.data.end}</h2>
            <h3><span>Budget :</span> ${this.data.budget} $</h3>
        </div>
        `;
        section
            .querySelector(".inactive-header")
            .addEventListener("click", () => {
                section.classList.add("active");
            });
        section
            .querySelector(".section-header")
            .addEventListener("click", () => {
                section.classList.remove("active");
            });
        return section;
    }

    createBuilding(estate) {
        const building = document.createElement("li");
        building.className = "building";
        building.innerHTML = `
            <div class="delete-building"></div>
            <div class="estimated">${estate.estimated} $ </div>
            <div class="bought">${estate.bought} $ </div>
            <div class="sale">${estate.sale} $ </div>
            <div class="buyAt">${estate.buyAt} &#8594; ${estate.sellAt}</div>
            <div class="difference">${estate.difference} $ </div>
            <div class="differenceDay">${
                estate.sellAt - estate.buyAt
            } jour(s)</div>
            <div class="pourcentage">${estate.pourcentage} %</div>
        `;
        const deleteBuilding = building.querySelector(".delete-building");
        const button = document.createElement("button");
        button.innerHTML = "&#10060;";

        deleteBuilding.appendChild(button);

        return building;
    }

    createNewSessionForm() {
        const div = document.createElement("div");
        div.classList.add("new-session");
        div.innerHTML = `
        <div class="input-group">
            <span class="period"></span>
        </div>
        <button id="new-session">Nouvelle session</button>
        `;
        const inputGroup = div.querySelector(".input-group");
        const period = inputGroup.querySelector(".period");
        this.createInputBuilding("start", "412", period);
        period.innerHTML += " &#8594; ";
        this.createInputBuilding("end", "457", period);
        this.createInputBuilding(
            "budget",
            "Budget : 1 = 1 000 000",
            inputGroup
        );

        return document.body.appendChild(div);
    }

    createList() {
        const list = document.createElement("ul");
        list.classList.add("list");
        list.innerHTML = `
            <li class="head">
                <div></div>
                <div class="estimated">Valeur estimé</div>
                <div class="bought">Acheté</div>
                <div class="sale">Vendu</div>
                <div class="buyAt">Achat &#8594; Vente</div>
                <div class="difference">Bénéfice</div>
                <div class="differenceDay">Vendu en</div>
                <div class="pourcentage">Bénéfice %</div>
            </li>
        `;
        this.data.dataObject.forEach((estate) => {
            const building = this.createBuilding(estate);
            list.appendChild(building);
        });

        list.innerHTML += `
        <li class="input-group">
            <div></div>
        </li>
        `;

        const inputGroup = list.querySelector(".input-group");
        this.createInputBuilding("estimated", "1.5 = 1 500 000", inputGroup);

        this.createInputBuilding("bought", "2.5 = 2 500 000", inputGroup);
        this.createInputBuilding("sale", "0.7 = 700 000", inputGroup);
        inputGroup.innerHTML += `<div class="buyAt"></div>`;
        const buyAt = inputGroup.querySelector(".buyAt");
        this.createInputBuilding("buyAt", "510", buyAt);
        buyAt.innerHTML += `&#8594;`;
        this.createInputBuilding("sellAt", "530", buyAt);
        inputGroup.innerHTML += `
            <div class="difference"></div>
            <div class="differenceDay"></div>
            <div class="submit"></div>
            `;
        const button = document.createElement("button");
        button.innerHTML = "Ajouter";
        inputGroup.querySelector(".submit").appendChild(button);
        return list;
    }

    createInputBuilding(id, placeholder, appendTo) {
        const input = document.createElement("input");
        input.id = id;
        input.setAttribute("type", "number");
        input.setAttribute("min", "0");
        input.setAttribute("step", "1");
        input.setAttribute("placeholder", placeholder);

        return appendTo.appendChild(input);
    }

    createFooter() {
        const footer = document.createElement("div");
        footer.classList.add("footer");
        footer.innerHTML = `
            <p>
                <hr>
                Achat de <strong>${
                    this.data.buildingBought
                } </strong> bâtiment(s) pour <strong>${
            this.data.totalBought
        } $ </strong>
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
                Pourcentage moyen de rachat : <strong>${
                    this.data.middlePourcent
                }%</strong>
            </p>
        `;

        return footer;
    }

    totalEarn(sessions) {
        const lastSession = sessions[sessions.length - 1];
        const activityStart = lastSession.start;
        const activityEnd = sessions[0].end;
        const activityDuration = activityEnd - activityStart;
        this.startingBudget = lastSession.budget;
        this.endingBudget = sessions[0].newBudget;

        sessions.forEach((estate) => {
            this.totalEarnSinceStart += estate.earn;
            this.totalBought += estate.totalBought;
            this.totalBuildingBought += estate.buildingBought;
            this.totalPourcentage = parseFloat(
                (this.totalEarnSinceStart * 100) / this.totalBought
            ).toFixed(2);
            this.totalPayday = this.totalEarnSinceStart / activityDuration;
        });

        this.totalBought = this.numberFormat(this.totalBought);
        this.totalEarnSinceStart = this.numberFormat(this.totalEarnSinceStart);
        this.totalPayday = this.numberFormat(this.totalPayday);
        this.startingBudget = this.numberFormat(this.startingBudget);
        this.endingBudget = this.numberFormat(this.endingBudget);

        const div = document.createElement("div");
        div.classList.add("totalStats");
        div.innerHTML = `
            <h2>Statistiques global</h2>
            <ul class="list">
                <li>
                    <span class="title">Budgets</span>
                    <span class="result">${this.startingBudget} $ &#8594; ${this.endingBudget} $</span>
                </li>
                <li>
                    <span class="title">Batiments acheté</span>
                    <span class="result">${this.totalBuildingBought}</span>
                </li>
                <li>
                    <span class="title">Total investi</span>
                    <span class="result">${this.totalBought} $</span>
                </li>
                <li>
                    <span class="title">Bénéfice total</span>
                    <span class="result">${this.totalEarnSinceStart} $</span>
                </li>
                <li>
                    <span class="title">Bénéfice moyen</span>
                    <span class="result">${this.totalPayday} $/jour</span>
                </li>
                <li>
                    <span class="title">Période d'activité</span>
                    <span class="result"> 
                    ${activityDuration} jours 
                    (${activityStart} &#8594; ${activityEnd})
                    </span>
                </li>
                <li>
                    <span class="title">Retour sur investissement</span>
                    <span class="result">${this.totalPourcentage}%</span>
                </li>
            </ul>
        `;

        document.body.appendChild(div);
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
