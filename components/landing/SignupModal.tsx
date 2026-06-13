import React, { useState, useEffect } from "react";

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
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onClose();
    if (isLogin) {
      onSubmitSuccess(`Welcome back! 🌴`);
    } else {
      onSubmitSuccess(`Welcome to VibeSpot adventure, ${fullName}! 🌴`);
    }
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleGoogleSubmit = () => {
    onClose();
    onSubmitSuccess(`Logged in with Google! 🌴`);
  }

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setIsLogin(true), 300);
    }
  }, [isOpen]);

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
        <h3 className="drawer-title">{isLogin ? "Welcome Back" : "Join VibeSpot"}</h3>
        <p className="drawer-subtitle">
          {isLogin 
            ? "Log in to continue planning with your friends."
            : "Connect with friends, map vibes, decide collaboratively."}
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          {!isLogin && (
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
                required={!isLogin}
              />
            </div>
          )}
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
          {!isLogin && (
            <div className="form-group">
              <label className="form-label" htmlFor="signup-confirm-pass">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-input"
                id="signup-confirm-pass"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors"
            style={{ marginTop: "1.5rem", padding: "10px", fontWeight: 600, border: "1px solid var(--color-border-primary)", borderRadius: "var(--border-radius-md)", backgroundColor: "white", cursor: "pointer", color: "var(--color-text-primary)" }}
            onClick={handleGoogleSubmit}
          >
            <i className="ti ti-brand-google text-lg"></i>
            Continue with Google
          </button>

          <button
            type="submit"
            className="action-btn-primary"
            style={{ marginTop: "1rem", padding: "12px", fontWeight: 700, width: "100%" }}
          >
            {isLogin ? "Login" : "Create free account"}
          </button>

          <div className="text-center mt-6 text-sm text-text-secondary">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button 
                  type="button" 
                  onClick={() => setIsLogin(false)}
                  className="text-brand-primary font-semibold hover:underline ml-1"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already signed up?{" "}
                <button 
                  type="button" 
                  onClick={() => setIsLogin(true)}
                  className="text-brand-primary font-semibold hover:underline ml-1"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
