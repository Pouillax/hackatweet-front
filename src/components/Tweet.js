import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Feed.module.css";

const MAX_TWEET_LEN = 280;

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `il y a ${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}

export default function Feed() {
  const currentUser = useMemo(
    () => ({
      firstName: "Marie",
      username: "marie123",
      avatarUrl: "/assets/egg.png",
    }),
    []
  );

  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const remaining = MAX_TWEET_LEN - text.length;
  const canTweet =
    text.trim().length > 0 &&
    text.length <= MAX_TWEET_LEN &&
    !isPosting;

  const handleTweet = (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    const newTweet = {
      id: crypto.randomUUID(),
      content: trimmed,
      author: currentUser,
      createdAt: new Date(),
    };

    setTweets((prev) => [newTweet, ...prev]);
    setText("");
  };

  useEffect(() => {
    const t = setInterval(() => {}, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleTweet}>
        <img
          src={currentUser.avatarUrl}
          alt="avatar"
          className={styles.avatar}
        />

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="What's up?"
            value={text}
            onChange={(e) =>
              setText(e.target.value.slice(0, MAX_TWEET_LEN))
            }
            className={styles.input}
          />

          <div className={styles.bottomRow}>
            <span className={styles.counter}>
              {text.length}/{MAX_TWEET_LEN}
            </span>

            <button
              type="submit"
              disabled={!canTweet}
              className={styles.button}
            >
              Tweet
            </button>
          </div>

          {error && (
            <div className={styles.error}>{error}</div>
          )}
        </div>
      </form>

      <div className={styles.feedList}>
        {tweets.map((t) => (
          <div key={t.id} className={styles.tweetCard}>
            <img
              src={t.author.avatarUrl}
              alt="avatar"
              className={styles.avatar}
            />

            <div className={styles.tweetContent}>
              <div className={styles.tweetHeader}>
                <strong>{t.author.firstName}</strong>
                <span className={styles.username}>
                  @{t.author.username}
                </span>
                <span className={styles.time}>
                  · {timeAgo(t.createdAt)}
                </span>
              </div>

              <p className={styles.tweetText}>
                {t.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
