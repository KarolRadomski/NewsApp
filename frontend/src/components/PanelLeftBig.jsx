import React from 'react';
import NewsItemMedium from '../components/NewsItemMedium';
import NewsItemLarge from '../components/NewsItemLarge';
import style from '../styles/Panel.module.css';
function PanelLeftBig({ firstNews, secondNews, thirdNews }) {
  return (
    <div className={style.wrapper}>
      <div className={style.bigNewsLeft}>
        <NewsItemLarge key={firstNews._id} news={firstNews} />
      </div>
      <div className={style.smallNewsOneLeft}>
        <NewsItemMedium key={secondNews._id} news={secondNews} />
      </div>
      <div className={style.smallNewsTwoLeft}>
        <NewsItemMedium key={thirdNews._id} news={thirdNews} />
      </div>
    </div>
  );
}

export default PanelLeftBig;
