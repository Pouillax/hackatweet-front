import { useState } from "react";
import styles from "../styles/SignForm.module.css";


function SignInForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { username, password };

    if (onSubmit) onSubmit(payload);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Welcome back!</h2>

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

      <button className={styles.button} type="submit">Sign in</button>
    </form>
  );
}

export default SignInForm;