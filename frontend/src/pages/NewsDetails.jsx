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
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
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
    `${news.createdAt}`.slice(0, 4);

  return (
    <>
      <div className={style.background}></div>
      <div className={style.container}>
        <h3 className={style.category}>{`${news.category}`.toUpperCase()}</h3>
        <h1 className={style.title}>{news.title}</h1>
        <div className={style.newsStatistic}>
          <div className={style.date}>
            <span className={style.icon}>
              <AiOutlineCalendar />
            </span>
            <span>{`${date}`}</span>
          </div>
          <div className={style.numberOfComments}>
            <span className={style.icon}>
              <BiComment />
            </span>
            <span>
              {comments.length ? `${comments.length} comments` : 'No Comments'}
            </span>
          </div>
        </div>
        <img className={style.image} src={news.img} alt="" />
        <p
          className={style.shortDesc}
          dangerouslySetInnerHTML={{ __html: news.description }}
        />

        <p
          className={style.longDesc}
          dangerouslySetInnerHTML={{ __html: news.longDescription }}
        />
        <div className={style.comments}>
          <h2>Comments ({comments.length})</h2>
          <CommentForm key={news._id} id={news._id} />
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
}

export default NewsDetails;
