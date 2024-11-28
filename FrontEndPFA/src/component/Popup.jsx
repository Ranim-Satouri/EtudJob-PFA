// Popup.jsx
import React, { useState } from "react";
import "./Popup.module.css";

function Popup({ onClose, onPostuler }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer le mail
    onPostuler(subject, content);
    // Fermer le popup
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2 className="popup-title">Postuler à l'offre</h2>
        <form onSubmit={handleSubmit}>
          <label className="popup-label">
            Objet :
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="popup-input"
            />
          </label>
          <label className="popup-label">
            Contenu :
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="popup-textarea"
            />
          </label>
          <button type="submit" className="popup-button">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
