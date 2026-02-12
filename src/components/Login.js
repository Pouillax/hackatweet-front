import styles from '../styles/Login.module.css'
import logo from '../assets/twitter-xxl.png'
function Login() {

    return(
        <div className={styles.mainContainer}>
            <div className={styles.loginLeft}></div>
            <div className={styles.loginRight}>
                <div ><img src={logo} className={styles.headerLogo} alt='Logo'></img></div>
                <h1 className={styles.mainTitle}>See what's happening</h1>
                <h3 className={styles.secondTitle}>Join Hackatweet today.</h3>
                <button className={styles.signUpBtn}>Sign up</button>
                <span className={styles.smallText}>Already have an account ?</span>
                <button className={styles.signInBtn}>Sign in</button>
            </div>
        </div>
    )

}

export default Login;