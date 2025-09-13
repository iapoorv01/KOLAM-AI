import React from "react";

interface StealthWormButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

export const StealthWormButton: React.FC<StealthWormButtonProps> = ({
  label = "SPACE",
  onClick,
  type = "button",
}) => (
  <button type={type} className="btn" onClick={onClick}>
    <strong>{label}</strong>
    <div id="container-stars">
      <div id="stars"></div>
    </div>
    <div id="glow">
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  </button>
);