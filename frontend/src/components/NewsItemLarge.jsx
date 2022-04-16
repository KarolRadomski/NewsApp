import React from 'react';
import style from '../styles/NewsItemLarge.module.css';
import { useNavigate } from 'react-router-dom';
function NewsItemLarge({ news }) {
  const navigate = useNavigate();
  return (
    <div
      className={style.container}
      onClick={() => navigate(`/newsdetails/${news._id}`)}
    >
      <div
        className={style.background}
        style={{ backgroundImage: `url('${news.img}')` }}
      ></div>
      <div className={style.title}>
        <p className={style.titleText}>{news.title}</p>
      </div>
    </div>
  );
}

export default NewsItemLarge;
