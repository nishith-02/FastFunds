import styles from "../../styles/Home/Login.module.css";
import { Modal } from "react-responsive-modal";
import { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import axios from "axios";
// import "../../styles/globals.css";
export default function LoginModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
  }, []);
  const signUpHandler = () => {
    props.onCloseModal();
    props.onOpenSignUpModal();
  };
  const close = () => {
    props.onCloseModal();
    props.setUser(true);
  };

  const forgotPassword = () => {};
  const submitHandler = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user/signin", {
        email,
        password,
      });
      const user = { token: res.data.token, userInfo: res.data.userInfo };
      localStorage.setItem("user", JSON.stringify(user));
      setError("");
      close();
      router.push("/#home");
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        console.log(error);
        setError("Something Went Wrong,Please Try Again!");
      }
    }
  };
  const bg = {
    overlay: {
      background: "#fff",
      // filter: "blur(10px) !important",
      opacity: 0.5,
    },
  };
  return (
    <Modal
      open={props.open}
      onClose={props.onCloseModal}
      center
      showCloseIcon={false}
      // styles={bg}
      classNames={{
        modal: styles.modal,
      }}
    >
      <div className={styles.root}>
        <div className={styles.head}>
          <p className={styles.headtext}>Log Into Your Account</p>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {error ? (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}
          <input
            className={styles.input}
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ marginTop: "2rem" }}
            className={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.part}>
            <div>
              <input
                type="checkbox"
                name="Login"
                value="Keep Me Logged In"
                style={{ marginRight: "8px" }}
                className={styles.checkbox}
              />
              <label htmlFor="Login">Keep me Logged In</label>
            </div>
            <div>
              <p className={styles.forgot} onClick={forgotPassword}>
                Forgot Password?
              </p>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className={styles.button}
            onClick={submitHandler}
          >
            Log In
          </button>
        </div>
        <div className={styles.need}>
          <p className={styles.ns}>
            Need an Account?{" "}
            <span
              style={{ color: "#1b9bf0", cursor: "pointer" }}
              onClick={signUpHandler}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
}
