import React from 'react';
import NewsItemMedium from '../components/NewsItemMedium';
import NewsItemLarge from '../components/NewsItemLarge';
import style from '../styles/Panel.module.css';
function PanelRightBig({ firstNews, secondNews, thirdNews }) {
  return (
    <div className={style.wrapper}>
      <div className={style.smallNewsOneRight}>
        <NewsItemMedium key={firstNews._id} news={firstNews} />
      </div>
      <div className={style.smallNewsTwoRight}>
        <NewsItemMedium key={secondNews._id} news={secondNews} />
      </div>
      <div className={style.bigNewsRight}>
        <NewsItemLarge key={thirdNews._id} news={thirdNews} />
      </div>
    </div>
  );
}

export default PanelRightBig;
