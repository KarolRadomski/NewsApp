import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NewsItem from '../components/NewsItem';
import {getNews, reset} from '../features/news/newsSlice'

function NewsPage() {
  const dispatch = useDispatch();

  const{news, isLoading, isError, message} = useSelector((state)=>state.news);
  
  useEffect(()=>{
      if (isError){
          console.log(message);
      }
      dispatch(getNews());
      return ()=>{
          dispatch(reset());
      }
  },[isError, message, dispatch])
  
    return (
    <>
        <section className='content'>
            {news.length > 0 ? (
                <div className="newses">
                    {news.map((newsOne)=>(
                            <NewsItem key={newsOne._id} news={newsOne} />
                    ))}
                </div>
            ) : (
                <h3>Sorry, we don't have news to show</h3>
            )}
        </section>
        <div>NewsPage</div>
    </>
  )
}

export default NewsPage