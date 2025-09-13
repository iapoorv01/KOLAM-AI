import React from "react";
import Link from "next/link";

interface KolamCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  list?: string[];
  icon?: React.ReactNode;
}

export function KolamCard({ title, description, buttonText, buttonHref, list, icon }: KolamCardProps) {
  return (
    <div className="card">
      <div className="card__border"></div>
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
      {buttonHref ? (
        <a href={buttonHref} style={{ textDecoration: 'none' }}>
          <button className="button mt-3 block text-center w-full" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="wrap">
              <p>
                <span>✧</span>
                <span>✦</span>
                {buttonText}
              </p>
            </div>
          </button>
        </a>
      ) : (
        <button className="button mt-3 w-full" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="wrap">
            <p>
              <span>✧</span>
              <span>✦</span>
              {buttonText}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
