export default class DOM {
    constructor(data) {
        this.data = data;
        console.log(this.data);
    }

    createSection() {
        let section = document.createElement("section");
        section.innerHTML = `
            <div class="section-header">
                <h2>Jour ${this.data.start} > Jour ${this.data.end}</h2>
                <h3>${this.data.budget}</h3>
            </div>
            `;
        return section;
    }

    init() {
        let section = this.createSection();
        document.body.appendChild(section);
    }
}
