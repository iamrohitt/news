import { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { BsEye, BsEyeSlash } from "react-icons/bs"; // Import eye icons from React Icons

const PasswordReset = () => {
  const navigate = useNavigate();
  const [validUrl, setValidUrl] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `http://localhost:4000/api/password-reset/${param.id}/${param.token}`;
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home", { state: { token } });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError("");
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Add New Password</h1>
            <div className="password-input-container">
              {" "}
              {/* New container to hold the password input and eye icon */}
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className={styles.input}
              />
              {passwordVisible ? (
                <BsEyeSlash
                  className="login-input-icon"
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <BsEye
                  className="login-input-icon"
                  onClick={handlePasswordVisibility}
                />
              )}
              {error && <div className={styles.error_msg}>{error}</div>}
              {msg && <div className={styles.success_msg}>{msg}</div>}
            </div>
            <button type="submit" className={styles.green_btn}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default PasswordReset;
