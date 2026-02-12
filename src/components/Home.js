import styles from '../styles/Home.module.css'

function Home() {

    return(
        <div className={styles.mainContainer}>
            <div className={styles.loginLeft}></div>
            <div className={styles.loginRight}>
                <div className={styles.headerLogo}><img src='./assets/'></img></div>
                <h1 className={styles.mainTitle}>See what's happening</h1>
                <h3 className={styles.secondTitle}>Join Hackatweet today.</h3>
                <button className={styles.signUpBtn}>Sign up</button>
                <span className={styles.smallText}>Already have an account ?</span>
                <button className={styles.signInBtn}>Sign in</button>
            </div>
        </div>
    )

}

export default Home;