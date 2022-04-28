import { useState } from 'react';
import styles from '../styles/CategoryList.module.css';
function CategoryList({ changeCategory, selectedCategory }) {
  const [active, setActive] = useState('');

  const changeActive = (selected) => {
    if (selected !== active) {
      setActive(selected);
      changeCategory(selected);
    }
  };
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <button
            className={
              selectedCategory === 'news' ? styles.btnActive : styles.btn
            }
            onClick={() => changeActive('news')}
          >
            ALL
          </button>
        </li>
        <li>
          <button
            className={
              selectedCategory === 'sport' ? styles.btnActive : styles.btn
            }
            onClick={() => changeActive('sport')}
          >
            Sport
          </button>
        </li>
        <li>
          <button
            className={
              selectedCategory === 'politics' ? styles.btnActive : styles.btn
            }
            onClick={() => changeActive('politics')}
          >
            Politics
          </button>
        </li>
        <li>
          <button
            className={
              selectedCategory === 'business' ? styles.btnActive : styles.btn
            }
            onClick={() => changeActive('business')}
          >
            Business
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CategoryList;
