import style from '../../styles/PopUp.module.css';
import { useState } from 'react';
import { editNews } from '../../features/news/newsSlice';
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditPopUp({ news, exit }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(news.title);
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const [description, setDescription] = useState(news.description);

  const [longDescription, setLongDescription] = useState(news.longDescription);

  const [img, setImg] = useState(news.img);
  const updateImg = (e) => {
    setImg(e.target.value);
  };

  const [category, setCategory] = useState(news.category);
  const updateCategory = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
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
          <label className={style.inputField}>
            Title: &nbsp;
            <input type="text" value={title} onChange={updateTitle} />
          </label>
          <label className={style.inputField}>
            Description: &nbsp;
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </label>
          <label className={style.inputField}>
            Long Description: &nbsp;
            <ReactQuill
              theme="snow"
              value={longDescription}
              onChange={setLongDescription}
            />
          </label>
          <label className={style.inputField}>
            Img URL: &nbsp;
            <input type="text" value={img} onChange={updateImg} />
          </label>
          <label className={style.inputField}>
            Category: &nbsp;
            <input type="text" value={category} onChange={updateCategory} />
          </label>
          <button className={style.btn} type="submit">
            {' '}
            Submit{' '}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPopUp;
