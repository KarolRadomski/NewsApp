import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewsItemSmallWithDesc from '../components/NewsItemSmallWithDesc';
import NewsItemSlider from '../components/NewsItemSlider';
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

  if (news.length > 5) {
    //One large carousele, two medium items, small items for the rest news
    SetTypeOfLayout(4);
  } else if (news.length > 3) {
    //Two medium items and one small
    return (
      <>
        <h1>News</h1>
        <section className="content">
          {news.map((newsOne) => (
            <NewsItemSmallWithDesc key={newsOne._id} news={newsOne} />
          ))}
        </section>
      </>
    );
  } else if (news.length > 0) {
    //Only few small items
    return (
      <>
        <h1>News</h1>
        <section className="content">
          {/* replace this two containers to one */}
          <div className="newses">
            {news.map((newsOne) => (
              <NewsItemSmallWithDesc key={newsOne._id} news={newsOne} />
            ))}
          </div>
        </section>
      </>
    );
  } else {
    <section className="content">
      return <h3>Sorry, we don't have news to show</h3>
    </section>;
  }
}

export default NewsPage;
