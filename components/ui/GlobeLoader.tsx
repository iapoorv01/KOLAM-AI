import React from "react";

export function GlobeLoader() {
  return (
    <div className="section-center">
      <div className="section-path">
        <div className="globe">
          <div className="wrapper">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i}></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
