import { useState } from "react";

function FormAddItem ({onAdd}) {
    const [nom, setNom] = useState("");
    const [quantite, setQuantite] = useState (1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!nom) return;

        onAdd (
            {nom,
             quantite : Number(quantite),
             id : Date.now(),
             achete : false   
            }
        );

        setNom("");
        setQuantite(1)
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input 
            type="text" 
            placeholder="Nom de l'article" 
            value={nom} 
            onChange={ (e) => setNom(e.target.value)}
            className = "input input-bordered flex-1"
            />

            <input 
            type="number"
            min="1"
            value={quantite}
            onChange={ (e) => setQuantite(e.target.value)}
            className="input input-bordered w-24" 
            />

            <button type="submit" className="btn btn-primary">Ajouter</button>

        </form>
    )
}

export default FormAddItem;