import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { confirmToDelete, frNumber, toMillion } from "../Functions";
import {
    createEstate,
    deleteSession,
    updateSession,
} from "../redux/slicer/sessionSlice";
import Estate from "./Estate";
import SessionFooter from "./SessionFooter";

export default function Session({ session }) {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    const [onEdit, setOnEdit] = useState(false);

    const toggleSession = () => {
        setIsActive(!isActive);
    };

    const handleDelete = (id) => {
        confirmToDelete("Es-tu sûr de vouloir supprimer cette session ?", () =>
            dispatch(deleteSession(id))
        );
    };

    const form = useRef();
    const formEdit = useRef();

    const handleEdit = () => {
        const inputs = formEdit.current.children;
        const period = inputs[0].children;
        const budget = inputs[1].children;

        const sessionEdit = {
            sessionId: session.id,
            start: Number(period.start.value),
            end: Number(period.end.value),
            budget: toMillion(budget.budget.value),
        };

        if (sessionEdit.start > sessionEdit.end) {
            alert("La date de début doit être inférieure à la date de fin");
            return;
        } else if (
            sessionEdit.budget <= 0 ||
            sessionEdit.start <= 0 ||
            sessionEdit.end <= 0
        ) {
            alert("Tu dois remplis tout les champs");
            return;
        } else {
            dispatch(updateSession(sessionEdit));
            setOnEdit(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = form.current;

        const newEstate = {
            id: Math.round(Date.now() * Math.random() * 100),
            estimated: toMillion(Number(inputs.estimated.value)),
            bought: toMillion(Number(inputs.bought.value)),
            sale: toMillion(Number(inputs.sale.value)),
            buyAt: Number(inputs.buyAt.value),
            sellAt: Number(inputs.sellAt.value) || 0,
        };

        if (newEstate.buyAt > newEstate.sellAt) {
            alert("La date de début doit être inférieure à la date de fin");
            return;
        } else if (
            newEstate.estimated <= 0 ||
            newEstate.bought <= 0 ||
            newEstate.sale <= 0 ||
            newEstate.buyAt <= 0
        ) {
            alert("Tu dois remplis tout les champs");
            return;
        } else {
            dispatch(
                createEstate({ sessionId: session.id, estate: newEstate })
            );
            inputs.reset();
        }
    };

    // console.log("Session", session);

    return (
        <section className={isActive ? "active" : ""}>
            <div className="inactive">
                <div className="inactive-header">
                    <h2>
                        Jour {session.start + " "}
                        <i className="fas fa-long-arrow-alt-right"></i> Jour{" "}
                        {session.end}
                        <br />
                        <span className="activityDuration">
                            {session.end - session.start} jour(s)
                        </span>
                    </h2>
                    <h3>
                        <span>Budget : </span>
                        {frNumber(session.budget)} $
                    </h3>
                    <h3>
                        <span>Bénéfice : </span>
                        {frNumber(session.totalEarn)} $
                    </h3>
                    <h3>
                        <span>Batiment(s) : </span>
                        {frNumber(session.totalEstateBought)}
                    </h3>
                    <button
                        className="delete"
                        onClick={() => handleDelete(session.id)}
                    >
                        Supprimer
                    </button>
                </div>
                <p>
                    <span onClick={toggleSession}>
                        <i className="fas fa-long-arrow-alt-down"></i>
                    </span>
                </p>
            </div>
            <div className="absolute-session-edit">
                <button
                    onClick={() => {
                        setOnEdit(!onEdit);
                    }}
                >
                    <i className="fas fa-edit"></i>
                </button>
            </div>
            {!onEdit ? (
                <div className="section-header display" onClick={toggleSession}>
                    <h2>
                        Jour {session.start}{" "}
                        <i className="fas fa-long-arrow-alt-right"></i> Jour{" "}
                        {session.end}
                    </h2>
                    <h3>
                        <span>Budget :</span> {frNumber(session.budget)} $
                    </h3>
                </div>
            ) : (
                <div className="section-header edit" ref={formEdit}>
                    <h2>
                        Jour{" "}
                        <input
                            type="number"
                            name="start"
                            id="start-edit"
                            defaultValue={session.start}
                        />{" "}
                        <i className="fas fa-long-arrow-alt-right"></i> Jour{" "}
                        <input
                            type="number"
                            name="end-edit"
                            id="end"
                            defaultValue={session.end}
                        />
                    </h2>
                    <h3>
                        <span>Budget :</span>{" "}
                        <input
                            type="number"
                            name="budget"
                            id="budget-edit"
                            defaultValue={toMillion(session.budget, false)}
                        />{" "}
                        $
                    </h3>
                    <button onClick={handleEdit}>
                        <i className="fas fa-check"></i>
                    </button>
                </div>
            )}
            <ul className="list">
                {session.estates.length !== 0 ? (
                    <>
                        <li className="head">
                            <div className="delete-estate"></div>
                            <div className="estimated">Valeur estimé</div>
                            <div className="bought">Acheté</div>
                            <div className="sale">Vendu</div>
                            <div className="buyAt">
                                Achat{" "}
                                <i className="fas fa-long-arrow-alt-right"></i>
                                Vente
                            </div>
                            <div className="difference">Bénéfice</div>
                            <div className="differenceDay">Bénéf. /jour</div>
                            <div className="pourcentage">Réduction %</div>
                        </li>
                        {session.estates.map((estate) => (
                            <Estate
                                estate={estate}
                                key={estate.id}
                                sessionId={session.id}
                            />
                        ))}
                    </>
                ) : (
                    <h3 className="empty">Aucune propriété</h3>
                )}
                <form className="input-group" ref={form}>
                    <div></div>
                    <input
                        type="number"
                        name="estimated"
                        required
                        placeholder="Valeur estimé"
                    />
                    <input
                        type="number"
                        name="bought"
                        required
                        placeholder="Acheté"
                    />
                    <input
                        type="number"
                        name="sale"
                        required
                        placeholder="Vendu"
                    />
                    <div className="buyAt">
                        <input
                            type="number"
                            name="buyAt"
                            required
                            placeholder="23"
                            defaultValue={session.start}
                        />
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <input
                            type="number"
                            required
                            name="sellAt"
                            placeholder="67"
                            defaultValue={session.end}
                        />
                    </div>
                    <div></div>
                    <div></div>
                    <button onClick={(e) => handleSubmit(e)}>Ajouter</button>
                </form>
            </ul>
            <SessionFooter session={session} />
        </section>
    );
}
