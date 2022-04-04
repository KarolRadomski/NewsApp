import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from '../styles/CommentForm.module.css';
import { setCommentsForNews } from '../features/comments/commentsSlice';

function CommentForm({ id }) {
  const dispatch = useDispatch();
  const [formDate, setFormDate] = useState({
    username: '',
    content: '',
  });
  const { username, content } = formDate;

  const onChange = (e) => {
    setFormDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      newsID: id,
      text: content,
      username: username,
    };
    dispatch(setCommentsForNews(commentData));
    setFormDate({
      username: '',
      content: '',
    });
  };

  return (
    <div>
      <section className={style.form}>
        <form onSubmit={onSubmit}>
          <div className={style.formGroup}>
            <input
              type="text"
              className={style.formControl}
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
            />
            <textarea
              type="text"
              className={style.formControl}
              id="content"
              name="content"
              value={content}
              placeholder="Enter your comment"
              onChange={onChange}
            />
          </div>

          <div className={style.formGroup}>
            <button type="submit" className={`${style.btn} ${style.btnBlock}`}>
              Comment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CommentForm;
