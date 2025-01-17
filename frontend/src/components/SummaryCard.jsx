import React from "react";

function SummaryCard({ value, title }) {
  return (
    <div style={{ margin: "10px", textAlign: "center" }}>
      <h2 style={{ color: "#6A5ACD" }}>{value}</h2>
      <p>{title}</p>
    </div>
  );
}

export default SummaryCard;
