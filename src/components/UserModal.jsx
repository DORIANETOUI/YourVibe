import { useState } from "react";

export default function UserModal({ onSave }) {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    if (!inputValue) return; // Empêche de valider si vide
    onSave(inputValue);      // Envoie le nom au parent
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 flex flex-col gap-4 shadow-lg">
        <h2 className="text-lg font-bold">Bienvenue !</h2>
        <p>Comment dois-je t'appeler ?</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Ton nom"
        />
        <button onClick={handleSave} className="btn btn-primary mt-2">
          Valider
        </button>
      </div>
    </div>
  );
}
    