import styles from '../styles/NewsItemSmallWithDesc.module.css';
import { useNavigate } from 'react-router-dom';
import timeAgo from '../features/timeAgoCalculator';

function NewsItemSmallWithDesc({ news }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.oneNews}
      onClick={() => navigate(`/newsdetails/${news._id}`)}
    >
      <div className={styles.img}>
        <img src={news.img} alt="" />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.titleAndData}>
          <h2>{news.title}</h2>
        </div>
        <div className={styles.descriptionAndCategory}>
          <p>{news.description}</p>

          <p className={styles.data}>{timeAgo(news.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsItemSmallWithDesc;
