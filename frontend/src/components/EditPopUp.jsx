import style from '../styles/EditPopUp.module.css';
import { useState } from 'react';
import { editNews } from '../features/news/newsSlice';
import { useDispatch } from 'react-redux';

function EditPopUp({ news, exit }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(news.title);
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const [description, setDescription] = useState(news.description);
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const [longDescription, setLongDescription] = useState(news.longDescription);
  const updateLongDescription = (e) => {
    setLongDescription(e.target.value);
  };

  const [img, setImg] = useState(news.img);
  const updateImg = (e) => {
    setImg(e.target.value);
  };

  const [category, setCategory] = useState(news.description);
  const updateCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNews = { _id: news._id, title, description, img, category };
    dispatch(editNews(updatedNews));
  };

  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <span className={style.close} onClick={() => exit()}>
          &times;{' '}
        </span>
        <h2>You're editing a news</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <label>
            Title: &nbsp;
            <input type="text" value={title} onChange={updateTitle} />
          </label>
          <label>
            Description: &nbsp;
            <textarea value={description} onChange={updateDescription} />
          </label>
          <label>
            Long Description: &nbsp;
            <textarea
              value={longDescription}
              onChange={updateLongDescription}
            />
          </label>
          <label>
            Img URL: &nbsp;
            <input type="text" value={img} onChange={updateImg} />
          </label>
          <label>
            Category: &nbsp;
            <input type="text" value={category} onChange={updateCategory} />
          </label>
          <button className="btn" type="submit">
            {' '}
            Submit{' '}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPopUp;
