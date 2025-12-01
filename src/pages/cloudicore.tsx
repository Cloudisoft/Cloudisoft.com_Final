import React from "react";

const CloudiCore: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "48px",
      }}
    >
      <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
        CloudiCore Simulator
      </h1>

      <p style={{ marginTop: "16px", fontSize: "18px", color: "#cccccc" }}>
        🎉 If you can see this text, routing is working and your page is not blank.
        Next we can add the full simulator UI.
      </p>
    </div>
  );
};

export default CloudiCore;
