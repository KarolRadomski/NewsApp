import styles from '../../styles/NewsItemForAdmin.module.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { deleteNews } from '../../features/news/newsSlice';
import { useDispatch } from 'react-redux';
import EditPopUp from './EditPopUp';
import { useState } from 'react';

function NewsItemForAdmin({ news }) {
  const dispatch = useDispatch();

  const [editPopUpVisible, setEditPopUpVisible] = useState(false);
  const switchEditPopUpVisible = () => {
    setEditPopUpVisible(!editPopUpVisible);
  };
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let date =
    months[parseInt(`${news.createdAt}`.slice(5, 7))] +
    ' ' +
    `${news.createdAt}`.slice(8, 10) +
    ', ' +
    `${news.createdAt}`.slice(0, 4) +
    '\u00A0 \u00A0' +
    `${news.createdAt}`.slice(11, 16);
  return (
    <>
      {editPopUpVisible ? (
        <EditPopUp news={news} exit={switchEditPopUpVisible} />
      ) : (
        ''
      )}
      <div className={styles.oneNews}>
        <div className={styles.title}>
          <p>{news.title}</p>
        </div>
        <div className={styles.date}>
          <p>{date}</p>
        </div>

        <div className={styles.buttons}>
          <div
            className={styles.editButton}
            onClick={() => switchEditPopUpVisible()}
          >
            <FiEdit />
          </div>
          <div
            className={styles.deleteButton}
            onClick={() => {
              dispatch(deleteNews(news._id));
            }}
          >
            <AiOutlineDelete />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsItemForAdmin;
