import styles from "../styles/NewsItem.module.css"

function NewsItem({ news }) {
  console.log(news);

  return (
    <div className={styles.oneNews}>
      <div className={styles.titleAndData}>
        <h2>{news.title}</h2>
        <p className={styles.data}>{news.createdAt.slice(0, 10)}  {news.createdAt.slice(11, 16)}</p>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.img}>
          <img src={news.img} alt="" />
        </div>
        <dir className={styles.descriptionAndCategory}>
          <p>{news.description}</p>
          <p className={styles.category}>{news.category}</p>
        </dir>
      </div>
    </div>
  )
}



export default NewsItem