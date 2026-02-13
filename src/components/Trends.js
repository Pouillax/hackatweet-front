import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Trends.module.css";

function Trends() {
  const router = useRouter();
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tweets/trends/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTrends(data.trends);
        }
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trends</h2>

      {trends.length === 0 ? (
        <p className={styles.noTrends}>No trends yet</p>
      ) : (
        <div className={styles.trendsList}>
          {trends.map((trend, index) => (
            <div key={index} className={styles.trendItem}>
              <span className={styles.hashtag}>{trend.hashtag}</span>
              <span className={styles.count}>
                {trend.count} {trend.count === 1 ? "tweet" : "tweets"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trends;
