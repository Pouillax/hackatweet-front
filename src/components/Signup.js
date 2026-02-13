import { useState } from "react";
import styles from "../styles/SignForm.module.css";


    function SignUpForm({ onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { firstname: firstName, username, password };

    if (onSubmit) onSubmit(payload);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Create your account!</h2>

      <input
        className={styles.input}
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        className={styles.input}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={styles.button} type="submit">Sign up</button>
    </form>
  );
}

export default SignUpForm;