import styles from '../styles/NewsItemForAdmin.module.css'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { deleteNews } from '../features/news/newsSlice'
import { useDispatch } from 'react-redux'
import EditPopUp from './EditPopUp'
import { useState } from 'react'


function NewsItemForAdmin({ news }) {

   const dispatch = useDispatch();

   const [editPopUpVisible, setEditPopUpVisible] = useState(false);
   const switchEditPopUpVisible = () => {
      setEditPopUpVisible(!editPopUpVisible);
   }

   return (
      <>
         {editPopUpVisible ? (<EditPopUp news={news} exit={switchEditPopUpVisible} />) : ('')}
         <div className={styles.oneNews}>
            <div className={styles.idInfo}>
               {news._id}
            </div>
            <div className={styles.NewsData}>
               <p>{news.title}</p>
            </div>
            <div className={styles.buttons}>
               <span onClick={() => switchEditPopUpVisible()} > <FiEdit /></span>
               <span onClick={() => { dispatch(deleteNews(news._id)) }}><AiOutlineDelete /></span>
            </div>
         </div >
      </>

   )
}

export default NewsItemForAdmin