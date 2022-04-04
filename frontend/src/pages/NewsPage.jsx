import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewsItem from '../components/NewsItem';
import Spinner from '../components/Spinner';
import { getNews, newsReset } from '../features/news/newsSlice';

function NewsPage() {
  const dispatch = useDispatch();

  const { news, isLoading, isError, message } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getNews());
    return () => {
      dispatch(newsReset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Aktualności</h1>
      <section className="content">
        {news.length > 0 ? (
          <div className="newses">
            {news.map((newsOne, index) => (
              <>
                <NewsItem key={newsOne._id} news={newsOne} />
                <h2>{index}</h2>
              </>
            ))}
          </div>
        ) : (
          <h3>Sorry, we don't have news to show</h3>
        )}
      </section>
    </>
  );
}

export default NewsPage;
