import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getNews, newsReset } from '../features/news/newsSlice';
import Spinner from '../components/Spinner';
import NewsItemForAdmin from '../components/AdminPanel/NewsItemForAdmin';
import BarForAdminPage from '../components/AdminPanel/BarForAdminPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { news, isLoading, isError, message } = useSelector(
    (state) => state.news
  );
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastId: 'error',
        autoClose: 5000,
      });
    }

    if (!admin) navigate('/admin');
    dispatch(getNews());
    dispatch(newsReset());
  }, [isError, message, admin, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="content">
        <BarForAdminPage />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar
          limit={1}
        />
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
  );
}

export default AdminPanel;
