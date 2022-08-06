import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { confirmToDelete, frNumber, toMillion } from "../Functions";
import { deleteEstate, updateEstate } from "../redux/slicer/sessionSlice";

export default function Estate({ estate, sessionId }) {
    const [onEdit, setOnEdit] = useState(false);
    const dispatch = useDispatch();
    const form = useRef();

    const difference = estate.sale - estate.bought;
    const pourcentage = parseFloat(
        (difference * 100) / estate.estimated
    ).toFixed(2);

    const handleDelete = () => {
        confirmToDelete("Es-tu sûr de vouloir supprimer ce batiment ?", () =>
            dispatch(deleteEstate({ estateId: estate.id, sessionId }))
        );
    };

    const toggleEdit = () => {
        setOnEdit(!onEdit);
    };

    console.log(onEdit);

    const handleEdit = () => {
        const inputs = form.current.children;
        const newEstate = {
            id: estate.id,
            estimated: Number(inputs.estimated.value),
            bought: Number(inputs.bought.value),
            sale: Number(inputs.sale.value),
            buyAt: Number(inputs[4].children.buyAt.value),
            sellAt: Number(inputs[4].children.sellAt.value) || 0,
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
                        <button onClick={handleDelete}>&#9587;</button>
                    </div>
                    <div className="estimated">
                        {frNumber(estate.estimated)} $
                    </div>
                    <div className="bought">{frNumber(estate.bought)} $</div>
                    <div className="sale">{frNumber(estate.sale)} $</div>
                    <div className="buyAt">
                        {estate.buyAt} &#8594; {estate.sellAt}
                    </div>
                    <div className="difference">{frNumber(difference)} $</div>
                    <div className="differenceDay">
                        {estate.sellAt - estate.buyAt} jour(s)
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
                        &#8594;
                        <input
                            type="number"
                            required
                            name="sellAt"
                            defaultValue={estate.sellAt}
                        />
                    </div>
                    <div className="edit-estate">
                        <button onClick={handleEdit}>&#10004;</button>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            )}
        </li>
    );
}
