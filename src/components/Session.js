import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { confirmToDelete, frNumber, toMillion } from "../Functions";
import { createEstate, deleteSession } from "../redux/slicer/sessionSlice";
import Estate from "./Estate";

export default function Session({ session }) {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);

    const toggleSession = () => {
        setIsActive(!isActive);
    };

    const handleDelete = (id) => {
        confirmToDelete("Es-tu sûr de vouloir supprimer cette session ?", () =>
            dispatch(deleteSession(id))
        );
    };

    const form = useRef();
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

    console.log("Session", session.estates);

    return (
        <section className={isActive ? "active" : ""}>
            <div className="inactive">
                <div className="inactive-header">
                    <h2>
                        Jour {session.start + " "}
                        &#8594; Jour {session.end}
                    </h2>
                    <h3>
                        <span>Budget : </span>
                        {frNumber(session.budget)} $
                    </h3>
                    <h3>
                        <span>Batiment : </span>
                        {session.totalEstateBought}
                    </h3>
                    <button
                        className="delete"
                        onClick={() => handleDelete(session.id)}
                    >
                        Supprimer
                    </button>
                </div>
                <p>
                    <span onClick={toggleSession}>&#8595;</span>
                </p>
            </div>
            <div className="section-header" onClick={toggleSession}>
                <h2>
                    Jour {session.start} &#8594; Jour {session.end}
                </h2>
                <h3>
                    <span>Budget :</span> {frNumber(session.budget)} $
                </h3>
            </div>
            <ul className="list">
                {session.estates.length != 0 ? (
                    <>
                        <li className="head">
                            <div className="delete-estate"></div>
                            <div className="estimated">Valeur estimé</div>
                            <div className="bought">Acheté</div>
                            <div className="sale">Vendu</div>
                            <div className="buyAt">Achat &#8594; Vente</div>
                            <div className="difference">Bénéfice</div>
                            <div className="differenceDay">Vendu en</div>
                            <div className="pourcentage">Bénéfice %</div>
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
                        &#8594;
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
        </section>
    );
}
