"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Tweet.module.css";

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

const API_URL = "http://localhost:3001";

export default function Tweet() {
  const [currentUser, setCurrentUser] = useState(null);
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const firstname = localStorage.getItem("firstname");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      setError("Tu n'es pas connecté.");
      return;
    }

    setCurrentUser({
      token,
      firstname,
      username,
      avatarUrl: "/assets/egg.png",
    });
  }, []);

  const canTweet =
    text.trim().length > 0 &&
    text.length <= MAX_TWEET_LEN &&
    !isPosting &&
    !!currentUser;

  const handleTweet = async (e) => {
    e.preventDefault();
    setError("");

    const trimmed = text.trim();
    if (!trimmed || !currentUser) return;

    setIsPosting(true);

    // affichage immédiat
    const optimisticTweet = {
      id: crypto.randomUUID(),
      content: trimmed,
      author: {
        firstname: currentUser.firstname,
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl,
      },
      createdAt: new Date(),
      _optimistic: true,
    };

    setTweets((prev) => [optimisticTweet, ...prev]);
    setText("");

    try {
      // call to backend
      const res = await fetch(`${API_URL}/tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ content: trimmed }),
      });

      const data = await res.json();

      if (!data.result) {
        throw new Error(data.error || "Tweet failed");
      }

      // renvoie le tweet envoyé par l'API
      setTweets((prev) =>
        prev.map((t) =>
          t.id === optimisticTweet.id
            ? {
                id: data.tweet.id ?? t.id,
                content: data.tweet.content ?? t.content,
                author: data.tweet.author ?? t.author,
                createdAt: data.tweet.createdAt ? new Date(data.tweet.createdAt) : t.createdAt,
              }
            : t
        )
      );
    } catch (err) {
      
      setTweets((prev) => prev.filter((t) => t.id !== optimisticTweet.id));
      setText(trimmed);
      setError(err.message || "Impossible de tweeter");
    } finally {
      setIsPosting(false);
    }
  };

  if (!currentUser) {
    return <div className={styles.container}>{error || "Chargement..."}</div>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleTweet}>
        <img src={currentUser.avatarUrl} alt="avatar" className={styles.avatar} />

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="What's up?"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_TWEET_LEN))}
            className={styles.input}
          />

          <div className={styles.bottomRow}>
            <span className={styles.counter}>
              {text.length}/{MAX_TWEET_LEN}
            </span>

            <button type="submit" disabled={!canTweet} className={styles.button}>
              {isPosting ? "..." : "Tweet"}
            </button>
          </div>

          {error && <div className={styles.error}>{error}</div>}
        </div>
      </form>

      <div className={styles.feedList}>
        {tweets.map((t) => (
          <div key={t.id} className={styles.tweetCard} style={{ opacity: t._optimistic ? 0.7 : 1 }}>
            <img src={t.author.avatarUrl} alt="avatar" className={styles.avatar} />

            <div className={styles.tweetContent}>
              <div className={styles.tweetHeader}>
                <strong>{t.author.firstname}</strong>
                <span className={styles.username}>@{t.author.username}</span>
                <span className={styles.time}>· {timeAgo(t.createdAt)}</span>
              </div>
              <p className={styles.tweetText}>{t.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
