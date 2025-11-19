import React from "react";
import { Link } from "react-router-dom";

function LinkInvalido() {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "100px",
      fontFamily: "Playfair Display, serif",
    }}>
      <h2>⚠️ Enlace inválido</h2>
      <p>Parece que tu invitación no tiene un enlace válido.</p>
      <p>Por favor solicita la liga correcta a los organizadores del evento.</p>
      {/* <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          border: "1px solid #333",
          borderRadius: "10px",
          textDecoration: "none",
          color: "#333",
        }}
      >
        Volver al inicio
      </Link> */}
    </div>
  );
}

export default LinkInvalido;
