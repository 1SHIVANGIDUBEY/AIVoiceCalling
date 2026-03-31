import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = await login(form.username, form.password);
    setLoading(false);
    if (data.message === "Logged in successfully") {
      navigate("/dashboard");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .login-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 40%, #e0e7ff 70%, #f0fdf4 100%);
          overflow: hidden;
          position: relative;
        }

        .login-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .login-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #c4b5fd, #818cf8);
          top: -130px; right: -100px;
          opacity: 0.55;
          animation: loginFloat 9s ease-in-out infinite;
        }
        .login-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, #a5f3fc, #6ee7b7);
          bottom: -80px; left: -80px;
          opacity: 0.45;
          animation: loginFloat 7s ease-in-out infinite reverse;
          animation-delay: -3s;
        }
        .login-orb-3 {
          width: 220px; height: 220px;
          background: radial-gradient(circle, #fde68a, #fca5a5);
          top: 38%; left: 18%;
          opacity: 0.4;
          animation: loginFloat 11s ease-in-out infinite;
          animation-delay: -6s;
        }
        @keyframes loginFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-28px) scale(1.06); }
        }

        .login-card {
          position: relative; z-index: 10;
          width: 100%; max-width: 440px;
          margin: 24px;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 28px;
          padding: 52px 48px;
          box-shadow:
            0 32px 80px rgba(99, 79, 210, 0.13),
            0 8px 24px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,1);
          animation: loginRise 0.65s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes loginRise {
          from { opacity: 0; transform: translateY(36px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .login-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.08));
          border: 1px solid #c4b5fd;
          border-radius: 99px;
          padding: 4px 14px;
          font-size: 11px; font-weight: 600;
          color: #7c3aed;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .login-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 700;
          color: #1e1b4b;
          line-height: 1.1;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .login-subtitle {
          font-size: 13.5px; color: #6b7280; font-weight: 400;
          margin-bottom: 36px;
        }

        .login-label {
          display: block;
          font-size: 11px; font-weight: 600;
          color: #6d28d9;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .login-input-wrap {
          position: relative;
          margin-bottom: 18px;
        }

        .login-input-icon {
          position: absolute;
          left: 16px; top: 50%;
          transform: translateY(-50%);
          color: #a78bfa;
          font-size: 15px;
          pointer-events: none;
          line-height: 1;
        }

        .login-input {
          width: 100%;
          padding: 13px 16px 13px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px; font-weight: 400;
          color: #1e1b4b;
          background: rgba(255,255,255,0.85);
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .login-input::placeholder { color: #c4b5fd; }
        .login-input:focus {
          border-color: #7c3aed;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(124,58,237,0.1), 0 1px 4px rgba(0,0,0,0.04);
        }

        .login-error {
          background: rgba(254,202,202,0.5);
          border: 1px solid #fca5a5;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: #dc2626;
          margin-bottom: 18px;
          text-align: center;
        }

        .login-btn {
          width: 100%;
          margin-top: 10px;
          padding: 15px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
          border: none; border-radius: 14px;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: transform 0.22s, box-shadow 0.22s;
          box-shadow: 0 8px 28px rgba(124,58,237,0.32), 0 2px 8px rgba(124,58,237,0.2);
          position: relative; overflow: hidden;
        }
        .login-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          pointer-events: none;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(124,58,237,0.38), 0 4px 12px rgba(124,58,237,0.24);
        }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .login-footer {
          text-align: center;
          font-size: 13px; color: #9ca3af;
          margin-top: 24px;
        }
        .login-footer a { color: #7c3aed; font-weight: 600; text-decoration: none; }
        .login-footer a:hover { text-decoration: underline; }

        .login-secure {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          margin-top: 24px;
          font-size: 11.5px; color: #9ca3af;
        }
      `}</style>

      <div className="login-root">
        {/* Background orbs */}
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />

        <div className="login-card">
          <div className="login-badge">&#9679; Admin Portal</div>

          <h1 className="login-heading">Welcome<br />back.</h1>
          <p className="login-subtitle">Sign in to your dashboard to continue.</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label className="login-label">Username</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">◉</span>
              <input
                name="username"
                type="text"
                required
                placeholder="Enter your username"
                onChange={handleChange}
                className="login-input"
              />
            </div>

            <label className="login-label">Password</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">⬡</span>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••••••"
                onChange={handleChange}
                className="login-input"
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <p className="login-footer">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>

          <div className="login-secure">
            🔒 256-bit encrypted · Secure session
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;