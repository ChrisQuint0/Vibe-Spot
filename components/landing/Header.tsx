import React from "react";

interface HeaderProps {
  onAboutOpen: () => void;
  onSignupOpen: () => void;
}

export default function Header({ onAboutOpen, onSignupOpen }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="brand-container">
        {/* Clickable uncontained logo */}
        <div className="logo-badge" onClick={() => window.location.reload()}>
          <img src="vibe_spot_logo_landing.png" alt="VibeSpot Logo" />
        </div>
        <a
          href="#"
          onClick={() => window.location.reload()}
          className="brand-name"
        >
          vibe<span style={{ color: "var(--color-accent-vibe)" }}>spot</span>
        </a>
      </div>
      <div className="header-actions">
        <button className="action-btn-outline" onClick={onAboutOpen}>
          About
        </button>
        <button className="action-btn-primary" onClick={onSignupOpen}>
          Sign up free
        </button>
      </div>
    </header>
  );
}
