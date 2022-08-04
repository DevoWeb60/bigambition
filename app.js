import Session from "./src/js/Session.js";
import Building from "./src/js/Building.js";
import DOM from "./src/js/DOM.js";

const sessions = [
    new Session(600, 630, 283, [
        new Building(63, 59, 63, 600, 602),
        new Building(9, 9, 9.5, 600, 602),
    ]),
    new Session(630, 645, 184, [
        new Building(25, 21, 25, 631, 635),
        new Building(89, 81, 88.5, 630, 638),
    ]),
];

sessions.forEach((session) => {
    const appendDOM = new DOM(session);
    appendDOM.init();
});
