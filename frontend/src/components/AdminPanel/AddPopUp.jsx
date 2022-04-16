import style from '../../styles/PopUp.module.css';
import { useState } from 'react';
import { addNews } from '../../features/news/newsSlice';
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditPopUp({ exit }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const [description, setDescription] = useState('');

  const [longDescription, setLongDescription] = useState('');

  const [img, setImg] = useState('');
  const updateImg = (e) => {
    setImg(e.target.value);
  };

  const [category, setCategory] = useState('');
  const updateCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const insertedNews = { title, description, longDescription, img, category };
    dispatch(addNews(insertedNews));
  };

  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <span className={style.close} onClick={() => exit()}>
          &times;{' '}
        </span>
        <h2>You're adding a news</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <label>
            Title: &nbsp;
            <input type="text" value={title} onChange={updateTitle} />
          </label>
          <label>
            Description: &nbsp;
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </label>
          <label>
            Long Description: &nbsp;
            <ReactQuill
              theme="snow"
              value={longDescription}
              onChange={setLongDescription}
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
