import Session from "./src/Session.js";
import Building from "./src/Building.js";
import DOM from "./src/DOM.js";

const sessions = [
    new Session(600, 630, 283, [new Building(63, 59, 63, 600, 602)]),
];

sessions.forEach((session) => {
    const appendDOM = new DOM(session);
    appendDOM.init();
});
