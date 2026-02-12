import styles from "../styles/Home.module.css";

function Hashtags() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentLeft}>
        <img src="" alt="LOGO"></img>
        <div className={styles.profile}>PROFILE</div>
      </div>
      <div className={styles.contentMiddle}>
        <div className={styles.middleHeader}>Hashtags{/*insérer le composant Tweet ici*/}</div>
        {/* ajouter les lastTweets ici*/}
      </div>
      <div className={styles.contentRight}>
        <div className={styles.middleHeader}>Trends</div>
        <div className={styles.hashtags}>{/*insérer les trends ici*/}</div>
      </div>
    </div>
  );
}

export default Hashtags;
