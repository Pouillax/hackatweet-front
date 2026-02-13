import { useState } from "react";
import styles from "../styles/Login.module.css";
import Modal from "./Modal";
import SignUpForm from "./Signup";
import SignInForm from "./Signin";

const API_URL = "http://localhost:3001"; // adapte le port de ton backend

async function signup(payload) {
  const res = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

async function signin(payload) {
  const res = await fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

function Login() {
  const [activeModal, setActiveModal] = useState(null);

  const handleSignUp = async (payload) => {
  const data = await signup(payload);
  if (data.result) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("firstname", data.firstname);
    localStorage.setItem("username", data.username);
    setActiveModal(null);
  } else {
    alert(data.error);
  }
};

const handleSignIn = async (payload) => {
  const data = await signin(payload);
  if (data.result) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("firstname", data.firstname);
    localStorage.setItem("username", data.username);
    setActiveModal(null);
  } else {
    alert(data.error);
  }
};


  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginLeft}></div>

      <div className={styles.loginRight}>
        <div className={styles.headerLogo}>
          <img src="./assets/" alt="logo" />
        </div>

        <h1 className={styles.mainTitle}>
          See what's happening
        </h1>

        <h3 className={styles.secondTitle}>
          Join Hackatweet today.
        </h3>

        {/* Bouton Sign up */}
        <button
          className={styles.signUpBtn}
          onClick={() => setActiveModal("signup")}
        >
          Sign up
        </button>

        <span className={styles.smallText}>
          Already have an account ?
        </span>

        {/* Bouton Sign in */}
        <button
          className={styles.signInBtn}
          onClick={() => setActiveModal("signin")}
        >
          Sign in
        </button>
      </div>

      {/* Modal Sign Up */}
      <Modal
        isOpen={activeModal === "signup"}
        onClose={() => setActiveModal(null)}
      >
        <SignUpForm onSubmit={handleSignUp} />

      </Modal>

      {/* Modal Sign In */}
      <Modal
        isOpen={activeModal === "signin"}
        onClose={() => setActiveModal(null)}
      >
        <SignInForm onSubmit={handleSignIn} />

      </Modal>
    </div>
  );
}

export default Login;
