import { useSelector, useDispatch } from 'react-redux';
import style from '../styles/Comment.module.css';
import timeAgo from '../features/timeAgoCalculator';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineDelete,
} from 'react-icons/ai';
import {
  incrementLikesCounter,
  decrementLikesCounter,
  deleteComment,
} from '../features/comments/commentsSlice';
import Cookies from 'universal-cookie';

let marked = [];
function Comment({ comment }) {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  if (cookies.get('marked')) marked = cookies.get('marked');

  const likeHandler = () => {
    if (
      !cookies.get('marked') ||
      !cookies.get('marked').includes(comment._id)
    ) {
      if (cookies.get('marked')) marked = cookies.get('marked');
      marked.push(comment._id);
      cookies.remove('marked');
      cookies.set('marked', marked, {
        path: `/newsdetails/${window.location.pathname.slice(13)}`,
      });
      dispatch(incrementLikesCounter(comment._id));
    }
  };

  const dislikeHandler = () => {
    if (
      !cookies.get('marked') ||
      !cookies.get('marked').includes(comment._id)
    ) {
      if (cookies.get('marked')) marked = cookies.get('marked');
      marked.push(comment._id);
      cookies.remove('marked');
      cookies.set('marked', marked, {
        path: `/newsdetails/${window.location.pathname.slice(13)}`,
      });
      dispatch(decrementLikesCounter(comment._id));
    }
  };

  const deleteHandler = () => {
    dispatch(deleteComment(comment._id));
  };

  return (
    <div className={style.comment}>
      <div className={style.leftSide}>
        <div className={style.author}>{comment.username}</div>
        <div className={style.content}>{comment.text}</div>
      </div>
      <div className={style.rightSide}>
        <div className={style.timeAgo}>{timeAgo(comment.createdAt)}</div>
        <div className={style.likes}>
          <AiOutlineLike onClick={likeHandler} />
          <div
            className={
              comment.likesCounter < 0
                ? style.likesCounterRed
                : style.likesCounterGreen
            }
          >
            {comment.likesCounter}
          </div>
          <AiOutlineDislike onClick={dislikeHandler} />
          {admin ? <AiOutlineDelete onClick={deleteHandler} /> : ''}
        </div>
      </div>
    </div>
  );
}

export default Comment;
