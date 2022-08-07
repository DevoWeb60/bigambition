import React from "react";
import {
    frNumber,
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
        </div>
    );
}
