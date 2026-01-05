import React from "react";

export default function ProductCard({ title, owner, price }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Owner: {owner}</p>
      <p>Price: {price}</p>
    </div>
  );
}
