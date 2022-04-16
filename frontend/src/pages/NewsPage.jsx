import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewsItemSmallWithDesc from '../components/NewsItemSmallWithDesc';
import NewsItemMedium from '../components/NewsItemMedium';
import NewsItemLarge from '../components/NewsItemLarge';
import CategoryList from '../components/CategoryList';
import style from '../styles/NewsPage.module.css';
import Spinner from '../components/Spinner';
import { getNews, newsReset } from '../features/news/newsSlice';

function NewsPage() {
  const dispatch = useDispatch();
  const { news, isLoading, isError, message } = useSelector(
    (state) => state.news
  );

  //Handling change of category
  const [selectedCategory, setSelectedCategory] = useState('news');
  const [filteredNews, setFilteredNews] = useState(news);

  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected);
    if (selected !== 'news')
      setFilteredNews(
        news.filter((oneNews) => (oneNews.category === selected ? true : false))
      );
    else setFilteredNews(news);
  };

  useEffect(() => {
    setFilteredNews(news);
  }, [news]);

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
    return <Spinner key="spinner" />;
  }

  if (filteredNews.length > 3) {
    //One large carousele, two medium items, small items for the rest news
    return (
      <>
        <h1 className={style.title}>News</h1>
        <CategoryList
          key="categories"
          changeCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
        <section className="content">
          <div className={style.container}>
            <div className={style.leftPanel}>
              <NewsItemLarge key={filteredNews[0]._id} news={filteredNews[0]} />
            </div>
            <div className={style.rightPanel}>
              <NewsItemMedium
                key={filteredNews[1]._id}
                news={filteredNews[1]}
              />
              <div className={style.spacer}></div>
              <NewsItemMedium
                key={filteredNews[2]._id}
                news={filteredNews[2]}
              />
            </div>
          </div>
          <div className={style.rowMedium}>
            {filteredNews.map(
              (newsOne, index) =>
                index > 2 && (
                  <div className={style.rowElement}>
                    <NewsItemMedium key={newsOne._id} news={newsOne} />
                  </div>
                )
            )}
          </div>
        </section>
      </>
    );
  } else if (filteredNews.length > 0) {
    //Two medium items and one small
    return (
      <>
        <h1 className={style.title}>News</h1>
        <CategoryList
          key="categories2"
          changeCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
        <section className="content">
          <div className="news">
            {filteredNews.map((newsOne) => (
              <NewsItemSmallWithDesc key={newsOne._id} news={newsOne} />
            ))}
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <h1 className={style.title}>News</h1>
        <CategoryList key="categories" changeCategory={handleCategoryChange} />
        <section className="content">
          <h3>Sorry, we don't have news to show</h3>
        </section>
      </>
    );
  }
}

export default NewsPage;
