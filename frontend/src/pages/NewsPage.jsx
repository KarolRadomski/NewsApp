import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewsItemSmallWithDesc from '../components/NewsItemSmallWithDesc';

import CategoryList from '../components/CategoryList';
import PanelLeftBig from '../components/PanelLeftBig';
import PanelRightBig from '../components/PanelRightBig';
import Spinner from '../components/Spinner';
import { getNews, newsReset } from '../features/news/newsSlice';

function NewsPage() {
  const dispatch = useDispatch();
  const { news, isLoading, isError, message } = useSelector(
    (state) => state.news
  );

  //Start of handling change of category
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
  //End of handling change of category

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

  if (filteredNews.length === 0)
    //brak newsów
    return (
      <>
        <CategoryList
          key="categories"
          changeCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
        <h3>Sorry, we don't have news to show</h3>
      </>
    );
  else if (filteredNews.length < 3)
    //za mało na panel więc same małe elementy
    return (
      <>
        <CategoryList
          key="categories"
          changeCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
        <div className="news">
          {filteredNews.map((newsOne) => (
            <NewsItemSmallWithDesc key={newsOne._id} news={newsOne} />
          ))}
        </div>
      </>
    );
  else if (filteredNews.length >= 3) {
    let numberOfPanels = filteredNews.length / 3;
    let index = 0;
    var components = [];
    components.push(
      <CategoryList
        key="categories"
        changeCategory={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
    );
    for (let i = 1; i <= numberOfPanels; i++) {
      if (i % 2 === 1) {
        components.push(
          <PanelLeftBig
            key={index}
            firstNews={filteredNews[index]}
            secondNews={filteredNews[index + 1]}
            thirdNews={filteredNews[index + 2]}
          />
        );
        index += 3;
      } else {
        components.push(
          <PanelRightBig
            key={index}
            firstNews={filteredNews[index]}
            secondNews={filteredNews[index + 1]}
            thirdNews={filteredNews[index + 2]}
          />
        );
        index += 3;
      }
    }
    filteredNews.map((newsOne, currentIndex) => {
      if (currentIndex === index) {
        components.push(
          <NewsItemSmallWithDesc key={newsOne._id} news={newsOne} />
        );
        index++;
      }
    });

    return <>{components}</>;
  }
}

export default NewsPage;
