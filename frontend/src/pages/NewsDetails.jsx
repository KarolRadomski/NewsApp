import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneNews, newsReset } from '../features/news/newsSlice';
import {
  getCommentsForNews,
  commentsReset,
} from '../features/comments/commentsSlice';
import Spinner from '../components/Spinner';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import style from '../styles/NewsDetails.module.css';

function NewsDetails() {
  const idFromUrl = window.location.pathname.slice(13);
  const dispatch = useDispatch();

  const { news, isNewsLoading, isNewsError, newsMessage } = useSelector(
    (state) => state.news
  );
  const { comments, isCommentsLoading, isCommentsError, commentsMessage } =
    useSelector((state) => state.comments);

  useEffect(() => {
    if (isNewsError || isCommentsError) {
      console.log(newsMessage);
      console.log(commentsMessage);
    }
    dispatch(getOneNews(idFromUrl));
    dispatch(getCommentsForNews(idFromUrl));
    return () => {
      dispatch(newsReset());
      dispatch(commentsReset());
    };
  }, [
    isNewsError,
    isCommentsError,
    newsMessage,
    commentsMessage,
    dispatch,
    idFromUrl,
  ]);

  if (isNewsLoading || isCommentsLoading) {
    return <Spinner />;
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>{news.title}</h2>
      <img className={style.image} src={news.img} alt="" />
      <p className={style.shortDesc}>{news.description}</p>
      <p className={style.longDesc}>{news.longDescription}</p>

      <div className={style.comments}>
        <h2>Comments ({comments.length})</h2>
        <CommentForm key={news._id} id={news._id} />
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default NewsDetails;
