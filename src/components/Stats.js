import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { frNumber, getPourcentage, getTotal } from "../Functions";

export default function Stats() {
    const { sessions } = useSelector((state) => state.sessions);

    const [lastSession, setLastSession] = useState(sessions[0] || []);
    const [firstSession, setFirstSession] = useState(
        sessions[sessions.length - 1] || []
    );

    const startingBudget = firstSession.budget;
    const endingBudget =
        lastSession.newBudget !== 0
            ? lastSession.newBudget
            : lastSession.budget;
    const activityStart = firstSession.start;
    const activityEnd = lastSession.end;

    const totalEstateBought = getTotal(sessions, "totalEstateBought");
    const totalBought = getTotal(sessions, "totalBought");

    const totalEarnSinceStart = getTotal(sessions, "totalEarn");

    const activityDurationBySession = sessions.map(
        (session) => session.end - session.start
    );
    let activityDuration = 0;
    activityDurationBySession.forEach((duration) => {
        activityDuration += duration;
    });

    const totalPayday = Math.round(totalEarnSinceStart / activityDuration);

    const totalPourcentage = getPourcentage(totalEarnSinceStart, totalBought);

    useEffect(() => {
        setLastSession(sessions[0] || []);
        setFirstSession(sessions[sessions.length - 1] || []);
    }, [sessions]);

    return (
        <>
            {sessions.length !== 0 && (
                <div className="totalStats">
                    <h2>Statistiques global</h2>
                    <ul className="list">
                        <li>
                            <span className="title">Budgets</span>
                            <span className="result">
                                {frNumber(startingBudget)} ${" "}
                                <i className="fas fa-long-arrow-alt-right"></i>{" "}
                                {frNumber(endingBudget)} $
                            </span>
                        </li>
                        <li>
                            <span className="title">Batiments acheté</span>
                            <span className="result">
                                {frNumber(totalEstateBought)}
                            </span>
                        </li>
                        <li>
                            <span className="title">Total investi</span>
                            <span className="result">
                                {frNumber(totalBought)} $
                            </span>
                        </li>
                        <li>
                            <span className="title">Bénéfice total</span>
                            <span className="result">
                                {frNumber(totalEarnSinceStart)} $
                            </span>
                        </li>
                        <li>
                            <span className="title">Bénéfice moyen</span>
                            <span className="result">
                                {frNumber(totalPayday)} $/jour
                            </span>
                        </li>
                        <li>
                            <span className="title">
                                Période d'activité (début{" "}
                                <i className="fas fa-long-arrow-alt-right"></i>{" "}
                                fin)
                            </span>
                            <span className="result">
                                {activityDuration} jours ({activityStart}{" "}
                                <i className="fas fa-long-arrow-alt-right"></i>{" "}
                                {activityEnd})
                            </span>
                        </li>
                        <li>
                            <span className="title">
                                Retour sur investissement
                            </span>
                            <span className="result">{totalPourcentage}%</span>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
