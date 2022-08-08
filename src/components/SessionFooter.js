import React from "react";
import {
    frNumber,
    getAverage,
    getMiddleEarnPourcentage,
    getPayday,
    getPourcentage,
    getTotalEarn,
} from "../Functions";

export default function SessionFooter({ session }) {
    const earnPourcentage = getPourcentage(
        session.totalEarn,
        session.totalBought
    );
    const payday = getPayday(session.totalEarn, session.start, session.end);

    const middlePourcent = getMiddleEarnPourcentage(session.estates);
    const averageEstimatePrice = getAverage(session.estates, "estimated");
    const averageSalePrice = getAverage(session.estates, "sale");
    const averageBoughtPrice = getAverage(session.estates, "bought");

    return (
        <div className="footer">
            <hr />
            Achat de <strong>{session.totalEstateBought} </strong> bâtiment(s)
            pour <strong>{frNumber(session.totalBought)} $ </strong>
            <hr />
            Bénéfice total : <strong>
                {" "}
                {frNumber(session.totalEarn)} ${" "}
            </strong>{" "}
            pour {session.end - session.start} jour(s)
            <hr />
            Le bénéfice est de{" "}
            <strong> {earnPourcentage ? earnPourcentage : "0"}% </strong> du
            total investi
            <hr />
            Moyenne par jour : <strong> {frNumber(payday)} $/jour </strong>
            <hr />
            Nouveau budget : <strong>~ {frNumber(session.newBudget)} $ </strong>
            <hr />
            Pourcentage moyen des reductions :{" "}
            <strong>{middlePourcent}%</strong>
            <hr />
            Moyenne des prix d'estimation :{" "}
            <strong>{frNumber(averageEstimatePrice)} $</strong>
            <hr />
            Moyenne des prix d'achat :{" "}
            <strong>{frNumber(averageBoughtPrice)} $</strong>
            <hr />
            Moyenne des prix de vente :{" "}
            <strong>{frNumber(averageSalePrice)} $</strong>
        </div>
    );
}
