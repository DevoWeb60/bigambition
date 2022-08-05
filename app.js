import Session from "./src/js/Session.js";
import Building from "./src/js/Building.js";
import DOM from "./src/js/DOM.js";

const sessions = [
    new Session(640, 695, 377, [
        new Building(101.4, 98.4, 101.4, 640, 644),
        new Building(73.2, 67.2, 73.2, 640, 641),
        new Building(81.8, 77.8, 81.8, 640, 641),
        new Building(92.8, 89.8, 92.8, 640, 641),
        new Building(46.2, 43.2, 46.2, 640, 646),
        new Building(10.4, 9.4, 10.4, 641, 648),
        new Building(175.1, 162.1, 175.1, 642, 644),
        new Building(15.1, 14.1, 15.1, 642, 644),
        new Building(76, 75, 76, 646, 649),
        new Building(23.8, 22.8, 23.8, 648, 656),
        new Building(395.2, 385.2, 395.2, 649, 650),
        new Building(438.3, 398.3, 438.3, 650, 654),
        new Building(178.2, 165.2, 178.2, 654, 674),
        new Building(175, 169, 175, 654, 673),
        new Building(113.4, 107.4, 113.4, 656, 659),
        new Building(29.7, 26.7, 29.7, 666, 668),
        new Building(25.2, 26.2, 25.2, 666, 668),
        new Building(537, 483, 537, 675, 687),
        new Building(569.9, 522.9, 569, 687, 695),
    ]),
    new Session(619, 639, 330, [
        new Building(42.8, 38.8, 42.8, 619, 632),
        new Building(36.1, 34.1, 36.1, 619, 620),
        new Building(92.3, 90.3, 92.3, 619, 624),
        new Building(47, 46, 47, 619, 628),
        new Building(28.5, 25.5, 28.5, 619, 636),
        new Building(26.1, 23.1, 26.1, 619, 620),
        new Building(23.2, 22.2, 23.2, 619, 624),
        new Building(87.1, 80.1, 87.1, 620, 621),
        new Building(15.6, 14.6, 15.6, 621, 625),
        new Building(191.4, 180.4, 191.4, 624, 625),
        new Building(222.5, 212.5, 222.5, 625, 629),
        new Building(27.7, 25.7, 27.7, 625, 639),
    ]),
    new Session(604, 617, 282, [
        new Building(90, 80, 90, 604, 608),
        new Building(203, 195, 203, 604, 606),
        new Building(145, 141, 145, 606, 617),
        new Building(31, 27, 31, 606, 607),
        new Building(33, 30, 33, 606, 613),
        new Building(25, 22, 25, 607, 610),
        new Building(38, 37, 38, 607, 611),
        new Building(48, 47, 48, 607, 609),
        new Building(179, 171, 179, 615, 616),
    ]),
    new Session(567, 597, 227, [
        new Building(63, 59, 63, 567, 597),
        new Building(9, 9, 9.5, 567, 582),
        new Building(53, 48, 55, 567, 572),
        new Building(86, 80, 88, 567, 575),
        new Building(77, 70, 78, 572, 576),
        new Building(39, 37, 39, 576, 586),
        new Building(128, 121, 128, 576, 586),
        new Building(34, 32, 34, 576, 597),
        new Building(93, 87, 93, 586, 593),
    ]),
    new Session(532, 538, 139, [
        new Building(94, 89, 96, 532, 538),
        new Building(24, 20, 25, 532, 536),
        new Building(35.5, 30.5, 37, 532, 538),
    ]),
    new Session(470, 530, 128.8, [
        new Building(100, 100 - 45.5, 100, 470, 530),
    ]),
];

const appendTotal = new DOM(sessions);

sessions.forEach((session) => {
    const appendDOM = new DOM(session);
});
