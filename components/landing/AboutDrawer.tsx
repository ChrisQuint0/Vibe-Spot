import React from "react";

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutDrawer({ isOpen, onClose }: AboutDrawerProps) {
  return (
    <div
      className={`drawer-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-drawer-btn"
          onClick={onClose}
          title="Close drawer"
        >
          <i className="ti ti-x"></i>
        </button>
        <div>
          <h3 className="drawer-title">About VibeSpot Pasig</h3>
          <p className="drawer-subtitle">What makes this capstone different.</p>
          <p
            style={{
              fontSize: "14.5px",
              lineHeight: "1.6",
              color: "var(--color-text-secondary)",
              marginBottom: "1.25rem",
            }}
          >
            VibeSpot addresses a fundamental human dynamic:{" "}
            <strong style={{ color: "var(--color-brand-primary)" }}>
              the friction of deciding where to go with friends.
            </strong>
          </p>
          <p
            style={{
              fontSize: "14.5px",
              lineHeight: "1.6",
              color: "var(--color-text-secondary)",
              marginBottom: "1.25rem",
            }}
          >
            Instead of endless WhatsApp scrollbacks, split screenshots, and
            coordinate debates, users can discover amazing local places around{" "}
            <strong>Pasig City</strong>, instantly pool ideas with friends, host
            live polls, and collectively confirm destinations in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
