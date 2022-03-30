import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneNews, reset } from '../features/news/newsSlice';
import Spinner from '../components/Spinner';
import style from '../styles/NewsDetails.module.css';

function NewsDetails() {
  const idFromUrl = window.location.pathname.slice(13);
  const dispatch = useDispatch();

  const { news, isLoading, isError, message } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getOneNews(idFromUrl));
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, idFromUrl]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>{news.title}</h2>
      <img className={style.image} src={news.img} alt="" />
      <p className={style.shortDesc}>{news.description}</p>
      <p className={style.longDesc}>{news.longDescription}</p>
    </div>
  );
}

export default NewsDetails;
