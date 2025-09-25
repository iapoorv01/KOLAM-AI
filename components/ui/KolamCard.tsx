import React from "react";
import Link from "next/link";

interface KolamCardProps {
  title: string;
  description: string;
  buttonText: React.ReactNode;
  buttonHref?: string;
  list?: string[];
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function KolamCard({ title, description, buttonText, buttonHref, list, icon, disabled }: KolamCardProps) {
  return (
    <div
      className="card kolam-card-shine"
      style={{
        position: 'relative',
        border: '8px solid transparent',
        borderImage: 'url(/border.png) 16 round',
        borderRadius: '32px',
        background: 'linear-gradient(180deg, #1d1925 0%, #280c1a 100%)',
        padding: '1.2rem 1rem 1rem 1rem',
        minHeight: '180px',
        overflow: 'hidden',
        color: '#e0e0e0',
        margin: '0.5rem 0',
        WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 0, transparent 0.5px, white 20px), radial-gradient(circle at 100% 0, transparent 0, transparent 0.5px, white 20px), radial-gradient(circle at 0 100%, transparent 0, transparent 0.5px, white 20px), radial-gradient(circle at 100% 100%, transparent 0, transparent 0.5px, white 20px), linear-gradient(white, white)',
        maskImage: 'radial-gradient(circle at 0 0, transparent 0, transparent 0.5px, white 20px), radial-gradient(circle at 100% 0, transparent 0, transparent 0.5px, white 20px), radial-gradient(circle at 0 100%, transparent 0, transparent 0.5px, white 20px), radial-gradient(circle at 100% 100%, transparent 0, transparent 0.5px, white 20px), linear-gradient(white, white)',
        WebkitMaskComposite: 'destination-in',
        maskComposite: 'intersect',
      }}
    >
      <div className="card_title__container flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span className="card_title font-bold text-base">{title}</span>
      </div>
  <p className="card_paragraph text-xs mt-1">{description}</p>
      {list && (
        <ul className="card__list">
          {list.map((item, idx) => (
            <li className="card__list_item" key={idx}>
              <span className="check">
                <svg className="check_svg" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" fillRule="evenodd"></path>
                </svg>
              </span>
              <span className="list_text">{item}</span>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .kolam-card-shine::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          border-radius: 32px;
          box-shadow: 0 0 0 4px gold, 0 0 16px 4px rgba(0, 123, 255, 0.5);
          z-index: 2;
        }
        .kolam-card-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(90deg, #3a0a2a 0%, #260617 100%);
          color: #ffd700;
          border: 2px solid #bfa335;
          border-radius: 999px;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.5rem 1.5rem;
          box-shadow: 0 2px 8px #000a;
          transition: box-shadow 0.2s, background 0.2s;
          width: 100%;
          margin-top: 1rem;
        }
        .kolam-card-btn:hover {
          background: linear-gradient(90deg, #4c113a 0%, #260617 100%);
          box-shadow: 0 4px 16px #000a;
        }
        .kolam-card-btn .icon {
          display: flex;
          align-items: center;
          font-size: 1.2em;
          margin-right: 0.5em;
        }
      `}</style>
      {buttonHref && !disabled ? (
        <a href={buttonHref} style={{ textDecoration: 'none', width: '100%' }}>
          <button className="kolam-card-btn">
            {buttonText}
          </button>
        </a>
      ) : (
        <button className="kolam-card-btn" disabled={disabled} style={disabled ? {background:'#eee',color:'#aaa',borderColor:'#ccc',cursor:'not-allowed',boxShadow:'none'} : {}}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
