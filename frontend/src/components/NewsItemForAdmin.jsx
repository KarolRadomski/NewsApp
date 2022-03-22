import styles from '../styles/NewsItemForAdmin.module.css'
import { AiOutlineDelete} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import {addNews, editNews, deleteNews } from '../features/news/newsSlice'
import {useDispatch} from 'react-redux'



function NewsItemForAdmin({ news }) {

   const dispatch = useDispatch();
   return (
      <div className={styles.oneNews}>
         <div className={styles.idInfo}>
            {news._id}
         </div>
         <div className={styles.NewsData}>
            <p>{news.title}</p>
         </div>
         <div className={styles.buttons}>
           <span ><FiEdit /></span>
           <span onClick={()=>{ dispatch(deleteNews(news._id))}}><AiOutlineDelete /></span>
         </div>
      </div>
   )
}

export default NewsItemForAdmin