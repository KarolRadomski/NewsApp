import React from 'react';
import style from '../styles/NewsItemMedium.module.css';
import { useNavigate } from 'react-router-dom';
function NewsItemMedium({ news }) {
  return (
    <a href={'/newsdetails/' + news._id}>
      <div
        className={style.background}
        style={{ backgroundImage: `url('${news.img}')` }}
      >
        <div className={style.title}>
          <p className={style.titleText}>{news.title}</p>
        </div>
      </div>
    </a>
  );
}

export default NewsItemMedium;
