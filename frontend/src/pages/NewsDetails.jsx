import React from 'react';
import { useSelector } from 'react-redux';

function NewsDetails() {
  const id = window.location.pathname.slice(13);

  let { news, isLoading, isError, message } = useSelector(
    (state) => state.news
  );
  console.log(news.title);
  news = news.filter((oneNews) => oneNews._id.toString() === id);
  // console.log(news);
  return (
    <div>
      <h2>{id}</h2>
      <h2>{window.location.pathname}</h2>
    </div>
  );
}

export default NewsDetails;
