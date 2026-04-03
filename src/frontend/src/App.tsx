import React from "react";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a2e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Liberation Sans, Arial, sans-serif",
        color: "#ffffff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <span
          style={{ color: "#FFD700", fontWeight: "bold", fontSize: "2.5rem" }}
        >
          SDR
        </span>
        <br />
        <span
          style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: "normal" }}
        >
          SichereDeineRechte
        </span>
      </div>
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#ffffff",
        }}
      >
        Diese Seite ist vorübergehend nicht verfügbar.
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#cccccc",
          maxWidth: "500px",
          lineHeight: "1.6",
        }}
      >
        Wir führen derzeit Wartungsarbeiten durch. Bitte versuchen Sie es später
        erneut.
      </p>
    </div>
  );
}
