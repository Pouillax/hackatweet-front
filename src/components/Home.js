import { useState } from "react";
import styles from "../styles/Home.module.css";
import Modal from "../components/Modal";

function Home() {
  const [activeModal, setActiveModal] = useState(null);

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
        <h2>Create your Hackatweet account</h2>
        <p>Formulaire 1</p>
      </Modal>

      {/* Modal Sign In */}
      <Modal
        isOpen={activeModal === "signin"}
        onClose={() => setActiveModal(null)}
      >
        <h2>Welcome back to Hackatweet</h2>
        <p>Formulaire 2</p>
      </Modal>
    </div>
  );
}

export default Home;
