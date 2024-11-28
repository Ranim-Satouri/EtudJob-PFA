import React, { useState } from "react";

function Modifierpwd() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérifier et mettre à jour le mot de passe
    // ...
  };

  return (
    <div>
      <h2>Modifier le Mot de Passe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="oldPassword">Ancien Mot de Passe :</label>
          <input type="password" id="oldPassword" name="oldPassword" value={formData.oldPassword} onChange={handleInputChange} required />
        </div>
        {/* Autres champs de formulaire */}
        {passwordCheckError && <div style={{ color: "red" }}>{passwordCheckError}</div>}
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default Modifierpwd;
