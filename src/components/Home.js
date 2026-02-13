import styles from "../styles/Home.module.css";
import Tweet from "./Tweet";

function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentLeft}>
        <img src="" alt="LOGO"></img>
        <div className={styles.profile}>PROFILE</div>
      </div>
      <div className={styles.contentMiddle}>
        <div className={styles.middleHeader}>Home</div>
        <Tweet/>
      </div>
      <div className={styles.contentRight}>
        <div className={styles.middleHeader}>Trends</div>
        <div className={styles.hashtags}>{/*insérer les trends ici*/}</div>
      </div>
    </div>
  );
}

export default Home;
