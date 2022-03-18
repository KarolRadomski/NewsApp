import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getNews, reset } from '../features/news/newsSlice'
import Spinner from '../components/Spinner';
import NewsItemForAdmin from '../components/NewsItemForAdmin';

function AdminPanel() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { news, isLoading, isError, message } = useSelector((state) => state.news);
   const { admin } = useSelector((state) => state.auth)

   useEffect(() => {
      if (!admin) navigate("/admin")
      if (isError) {
         console.log(message);
      }
      dispatch(getNews());
      return () => {
         dispatch(reset());
      }
   }, [isError, message, admin, navigate, dispatch])

   if (isLoading) return (<Spinner />)

   return (
      <>
         <section className='content'>
            {news.length > 0 ? (
               <div className="newses">
                  {news.map((newsOne) => (
                     <NewsItemForAdmin key={newsOne._id} news={newsOne} />
                  ))}
               </div>
            ) : (
               <h3>Sorry, we don't have news to show</h3>
            )}
         </section>
      </>
   )
}

export default AdminPanel