import styles from '../styles/NewsItem.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function NewsItem({ news }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.oneNews}
      onClick={() => navigate(`/newsdetails/${news._id}`)}
    >
      <div className={styles.titleAndData}>
        <h2>{news.title}</h2>
        <p className={styles.data}>
          {news.createdAt.slice(0, 10)} {news.createdAt.slice(11, 16)}
        </p>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.img}>
          <img src={news.img} alt="" />
        </div>
        <div className={styles.descriptionAndCategory}>
          <p>{news.description}</p>
          <p className={styles.category}>{news.category}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
