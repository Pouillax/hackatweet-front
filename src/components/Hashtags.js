import styles from "../styles/Home.module.css";

function Hashtags() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentLeft}>
        <img src="" alt="LOGO"></img>
        <div className={styles.profile}>PROFILE</div>
      </div>
      <div className={styles.contentMiddle}>
        <div className={styles.middleHeader}><h3>Hashtags</h3><input type="search" className={styles.searchBar}></input></div>
        {/* ajouter les lastTweets avec hashtags correspondant ici*/}
      </div>
      <div className={styles.contentRight}>
        <div>Trends</div>
        <div className={styles.hashtags}>{/*insérer les trends ici*/}</div>
      </div>
    </div>
  );
}

export default Hashtags;
