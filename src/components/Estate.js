import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
    confirmToDelete,
    frNumber,
    getDifference,
    getPourcentage,
    toMillion,
} from "../Functions";
import { deleteEstate, updateEstate } from "../redux/slicer/sessionSlice";

export default function Estate({ estate, sessionId }) {
    const [onEdit, setOnEdit] = useState(false);
    const dispatch = useDispatch();
    const form = useRef();

    const difference = getDifference(estate.sale, estate.bought);
    const pourcentage = getPourcentage(
        estate.estimated - estate.bought,
        estate.estimated
    );

    const handleDelete = () => {
        confirmToDelete("Es-tu sûr de vouloir supprimer ce batiment ?", () =>
            dispatch(deleteEstate({ estateId: estate.id, sessionId }))
        );
    };

    const toggleEdit = () => {
        setOnEdit(!onEdit);
    };

    const handleEdit = () => {
        const inputs = form.current.children;
        const newEstate = {
            id: estate.id,
            estimated: Number(inputs.estimated.value),
            bought: Number(inputs.bought.value),
            sale: Number(inputs.sale.value),
            buyAt: Number(inputs[4].children.buyAt.value),
            sellAt: Number(inputs[4].children.sellAt.value) || 0,
            difference: getDifference(inputs.sale.value - inputs.bought.value),
            pourcentage: getPourcentage(
                inputs.estimated.value - inputs.bought.value,
                inputs.estimated.value
            ),
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
            dispatch(updateEstate({ sessionId, updatedEstate: newEstate }));
            toggleEdit();
        }
    };

    return (
        <li className="building" id={estate.id}>
            {!onEdit ? (
                <div className="display" onClick={toggleEdit}>
                    <div className="delete-estate">
                        <button onClick={handleDelete}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                    <div className="estimated">
                        {frNumber(estate.estimated)} $
                    </div>
                    <div className="bought">{frNumber(estate.bought)} $</div>
                    <div className="sale">{frNumber(estate.sale)} $</div>
                    <div className="buyAt">
                        {estate.buyAt}{" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                        {estate.sellAt}
                    </div>
                    <div className="difference">{frNumber(difference)} $</div>
                    <div className="perDay">
                        {frNumber(
                            Math.round(
                                difference / (estate.sellAt - estate.buyAt)
                            )
                        ) + " $/j"}
                    </div>
                    <div className="pourcentage">{pourcentage}  %</div>
                </div>
            ) : (
                <div className="editing" ref={form}>
                    <div></div>
                    <input
                        type="number"
                        required
                        name="estimated"
                        defaultValue={toMillion(estate.estimated, false)}
                    />
                    <input
                        type="number"
                        required
                        name="bought"
                        defaultValue={toMillion(estate.bought, false)}
                    />
                    <input
                        type="number"
                        required
                        name="sale"
                        defaultValue={toMillion(estate.sale, false)}
                    />
                    <div className="buyAt input">
                        <input
                            type="number"
                            required
                            name="buyAt"
                            defaultValue={estate.buyAt}
                        />
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <input
                            type="number"
                            required
                            name="sellAt"
                            defaultValue={estate.sellAt}
                        />
                    </div>
                    <div className="edit-estate">
                        <button onClick={handleEdit}>
                            <i className="fas fa-check"></i>
                        </button>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            )}
        </li>
    );
}
