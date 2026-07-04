import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { makeRequest } from "../../axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // FIX: without this guard, clicking Register more than once (or double
    // clicking) fired a second request. The first one succeeds silently,
    // so the second one is a genuine duplicate and correctly comes back
    // as "User already exists!" — which looked like registration itself
    // was broken. Disabling the button while a request is in flight, and
    // giving clear success feedback below, fixes both the confusion and
    // the double-submit.
    if (loading) return;
    setErr(null);
    setLoading(true);

    try {
      await makeRequest.post("/auth/register", inputs);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login", { state: { registered: true } });
      }, 1200);
    } catch (err) {
      setErr(err.response?.data || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Loopin.</h1>
          <p>
            Join a community built for real connection. Share what matters,
            follow the people you care about, and never miss a moment.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && (
              <span className="error">
                {typeof err === "string" ? err : err.message || "Something went wrong"}
              </span>
            )}
            {success && (
              <span className="success">
                Account created! Redirecting you to login...
              </span>
            )}
            <button onClick={handleClick} disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;