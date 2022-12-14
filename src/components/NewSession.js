import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toMillion } from "../Functions";
import { createSession } from "../redux/slicer/sessionSlice";

export default function NewSession() {
    const { sessions } = useSelector((state) => state.sessions);
    const dispatch = useDispatch();
    const form = useRef();

    const handleSubmit = () => {
        const inputs = form.current;

        const newSession = {
            id: Math.round(Date.now() * Math.random() * 100),
            start: Number(inputs.start.value),
            end: Number(inputs.end.value),
            budget: toMillion(Number(inputs.budget.value)),
            estates: [],
            totalBought: 0,
            totalEarn: 0,
            totalEstateBought: 0,
            newBudget: 0,
        };

        if (newSession.start > newSession.end) {
            alert("La date de début doit être inférieure à la date de fin");
            return;
        } else if (
            newSession.start <= 0 ||
            newSession.end <= 0 ||
            newSession.budget <= 0
        ) {
            alert("Tu dois remplir tout les champs");
            return;
        } else {
            dispatch(createSession(newSession));
            inputs.reset();
        }
    };

    let budget = "";
    if (sessions[0]?.estates && sessions[0]?.estates.length > 0) {
        if (sessions[0]?.newBudget !== 0) {
            console.log("newBudget", sessions[0]?.newBudget);
            budget = toMillion(sessions[0]?.newBudget, false);
        }
    } else {
        if (sessions[0]?.budget) {
            console.log("budget", sessions[0]?.budget);
            budget = toMillion(sessions[0]?.budget, false);
        }
    }

    useEffect(() => {}, [sessions]);

    return (
        <div className="new-session">
            <form className="input-group" ref={form}>
                <div className="period">
                    <input
                        type="number"
                        required
                        name="start"
                        defaultValue={sessions[0] ? sessions[0].end : ""}
                        placeholder="Début"
                    />
                    <i className="fas fa-long-arrow-alt-right"></i>
                    <input
                        type="number"
                        required
                        name="end"
                        defaultValue={sessions[0] ? sessions[0].end + 30 : ""}
                        placeholder="Fin"
                    />
                </div>
                <input
                    type="number"
                    name="budget"
                    defaultValue={budget}
                    placeholder="Budget : 1 = 1 Million"
                    required
                />
            </form>
            <button onClick={() => handleSubmit()}>Nouvelle session</button>
        </div>
    );
}
