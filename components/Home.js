import { useState } from "react";
import Modal from "./Modal";

function Home() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div>
      <button onClick={() => setActiveModal("signup")}>
        Sign up
      </button>

      <button onClick={() => setActiveModal("signin")}>
        Sign in
      </button>

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