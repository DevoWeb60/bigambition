import React, { useRef } from "react";
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
            totalSale: 0,
            totalEstateBought: 0,
        };

        if (newSession.start > newSession.end) {
            alert("La date de début doit être inférieure à la date de fin");
            return;
        } else if (
            newSession.start <= 0 ||
            newSession.end <= 0 ||
            newSession.budget <= 0
        ) {
            alert("Tu dois remplis tout les champs");
            return;
        } else {
            dispatch(createSession(newSession));
            inputs.reset();
        }
    };

    return (
        <div className="new-session">
            <form className="input-group" ref={form}>
                <div className="period">
                    <input
                        type="number"
                        required
                        name="start"
                        placeholder="Début"
                    />
                    &#8594;
                    <input
                        type="number"
                        required
                        name="end"
                        placeholder="Fin"
                    />
                </div>
                <input
                    type="number"
                    name="budget"
                    placeholder="Budget : 1 = 1 Million"
                    required
                />
            </form>
            <button onClick={() => handleSubmit()}>Nouvelle session</button>
        </div>
    );
}
