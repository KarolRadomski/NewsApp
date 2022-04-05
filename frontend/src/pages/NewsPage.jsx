import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewsItemSmallWithDesc from '../components/NewsItemSmallWithDesc';
import NewsItemMedium from '../components/NewsItemMedium';
import NewsItemLarge from '../components/NewsItemLarge';
import style from '../styles/NewsPage.module.css';
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

  if (news.length > 6) {
    //One large carousele, two medium items, small items for the rest news
    return (
      <>
        <h1>News</h1>
        <section className="content">
          <div className={style.container}>
            <div className={style.leftPanel}>
              <NewsItemLarge key={news[0]._id} news={news[0]} />
            </div>
            <div className={style.rightPanel}>
              <NewsItemMedium key={news[1]._id} news={news[1]} />
              <div className={style.spacer}></div>
              <NewsItemMedium key={news[2]._id} news={news[2]} />
            </div>
          </div>

          <div className={style.rowMedium}>
            <div className={style.rowElement}>
              <NewsItemMedium key={news[3]._id} news={news[3]} />
            </div>

            <div className={style.rowElement}>
              <NewsItemMedium key={news[4]._id} news={news[4]} />
            </div>

            <div className={style.rowElement}>
              <NewsItemMedium key={news[5]._id} news={news[5]} />
            </div>
          </div>

          {news.map(
            (newsOne, index) =>
              index > 4 && (
                <NewsItemSmallWithDesc key={newsOne._id} news={newsOne} />
              )
          )}
        </section>
      </>
    );
  } else if (news.length > 3) {
    //Two medium items and one small
    return (
      <>
        <h1>News</h1>
        <section className="content">
          <div className="newses">
            <NewsItemMedium />
            <NewsItemMedium />
            {news.map(
              (newsOne, index) =>
                index > 2 && (
                  <NewsItemSmallWithDesc key={newsOne._id} news={newsOne} />
                )
            )}
          </div>
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
  return <h1>dsa</h1>;
}

export default NewsPage;
