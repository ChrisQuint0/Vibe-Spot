import React, { useState } from "react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export default function SignupModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: SignupModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    onSubmitSuccess(`Welcome to VibeSpot adventure, ${fullName}! 🌴`);
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-drawer-btn"
          onClick={onClose}
          title="Close modal"
        >
          <i className="ti ti-x"></i>
        </button>
        <h3 className="drawer-title">Join VibeSpot Pasig</h3>
        <p className="drawer-subtitle">
          Connect with friends, map vibes, decide collaboratively.
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-name">
              Full name
            </label>
            <input
              type="text"
              className="form-input"
              id="signup-name"
              placeholder="Juan dela Cruz"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">
              Email address
            </label>
            <input
              type="email"
              className="form-input"
              id="signup-email"
              placeholder="juan@vibespot.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-pass">
              Password
            </label>
            <input
              type="password"
              className="form-input"
              id="signup-pass"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="action-btn-primary"
            style={{ marginTop: "1rem", padding: "12px", fontWeight: 700 }}
          >
            Create free account
          </button>
        </form>
      </div>
    </div>
  );
}
